<?php
// ==========================================
// 1. CONFIGURAÇÕES
// ==========================================
$ipUnniti = "172.16.10.5";
$baseUrl = "https://{$ipUnniti}";
$urlListaResumida = "{$baseUrl}/xml/ramais/ramais_inicio_resumido.xml";
$urlDetalhesBase = "{$baseUrl}/xml/ramais/ramais/ramais_basico.xml?IndiceDnsSelec=";

// Substitua pelas credenciais reais de acesso à central
$usuario = 'admin'; 
$senha = 'M@gnum@Un';  

// Injetamos as credenciais direto no Cookie!
$cookies = "username={$usuario}; senha={$senha}; idiomaLogin=pt-BR;";

$headers = [
    'Referer: ' . $baseUrl . '/',
    'Accept: */*',
    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
];

// Função enxuta para fazer o GET
function buscarDadosUnniti($url, $headers, $cookies) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_COOKIE => $cookies // Envia o cookie forjado
    ]);

    $response = curl_exec($ch);
    curl_close($ch);
    return $response;
}

// ==========================================
// 2. BUSCANDO A LISTA MESTRE
// ==========================================
$xmlResumidoStr = buscarDadosUnniti($urlListaResumida, $headers, $cookies);

// INCLUA ESTAS DUAS LINHAS TEMPORÁRIAS PARA VER O QUE A CENTRAL RESPONDEU DE VERDADE:
// echo "<textarea style='width:100%; height:300px;'>" . htmlspecialchars($xmlResumidoStr) . "</textarea>";
// exit; // O código para aqui.

if (empty($xmlResumidoStr)) {
    die(json_encode(['erro' => 'Falha ao obter o XML inicial. Verifique credenciais e IP.']));
}

// Converte a string em um objeto XML manipulável no PHP
$xmlResumido = simplexml_load_string($xmlResumidoStr);
$listaFinalRamais = [];

// ==========================================
// 3. O LOOP DE ENRIQUECIMENTO (COM TRAVA DE TESTE)
// ==========================================
// Aumenta o tempo limite do PHP para 5 minutos (evita o erro 504/Timeout)
set_time_limit(300);

$listaFinalRamais = [];

// O preg_match_all extrai os índices
preg_match_all('/<indiceDNS>([^<]+)<\/indiceDNS>.*?<nomeDNS>([^<]+)<\/nomeDNS>/is', $xmlResumidoStr, $matches);

if (!empty($matches[1])) {
    
    $limiteTestes = 10; // TRAVA DE SEGURANÇA: Vai puxar só 3 ramais para testar
    $contador = 0;
    
    foreach ($matches[1] as $key => $indice) {
        
        // Se já puxou 3 ramais, ele interrompe o laço para a página carregar rápido
        if ($contador >= $limiteTestes) {
            break; 
        }
        
        $numero = $matches[2][$key];
        
        if (!empty($indice)) {
            // Busca os detalhes
            $urlDetalhe = $urlDetalhesBase . trim($indice);
            $xmlDetalheStr = buscarDadosUnniti($urlDetalhe, $headers, $cookies);
            
            // Extrai o Nome/Setor usando a tag <GeralApelidoRamal>
            preg_match('/<GeralApelidoRamal>([^<]*)<\/GeralApelidoRamal>/is', $xmlDetalheStr, $matchNome);
            
            $listaFinalRamais[] = [
                'indice' => trim($indice),
                'numero' => trim($numero),
                // Se encontrou a tag e não está vazia, salva o nome. Se não, fica nulo.
                'nome' => !empty($matchNome[1]) ? trim($matchNome[1]) : null
            ];
            
            $contador++; // Aumenta o contador
            usleep(100000); // Pausa de 100ms
        }
    }
} else {
    die(json_encode(['erro' => 'Nenhum ramal encontrado.']));
}

// ==========================================
// 4. SAÍDA DO JSON
// ==========================================
header('Content-Type: application/json; charset=utf-8');
echo json_encode($listaFinalRamais, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>