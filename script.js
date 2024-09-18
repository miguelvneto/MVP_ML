// Criar o mapa centrado em Los Angeles (coordenadas aproximadas de Los Angeles)
var map = L.map('map').setView([34.0522, -118.2437], 12);

// Adicionar camada do mapa (usando OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Adicionar a barra de pesquisa para encontrar locais
var geocoder = L.Control.geocoder({
    defaultMarkGeocode: false
})
.on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
        [bbox.getSouthEast().lat, bbox.getSouthEast().lng],
        [bbox.getNorthEast().lat, bbox.getNorthEast().lng],
        [bbox.getNorthWest().lat, bbox.getNorthWest().lng],
        [bbox.getSouthWest().lat, bbox.getSouthWest().lng]
    ]).addTo(map);

    // Centralizar o mapa no local pesquisado
    map.fitBounds(poly.getBounds());
}).addTo(map);

// Definir a área de Los Angeles usando um polígono aproximado (você pode refinar as coordenadas)
var laBounds = L.polygon([
    [34.1614, -118.6682], // Coordenadas aproximadas do canto noroeste de Los Angeles
    [33.9019, -118.6682], // Sudoeste
    [33.9019, -118.1219], // Sudeste
    [34.1614, -118.1219]  // Nordeste
]).addTo(map);

// Função para registrar o clique do usuário no mapa e confirmar o local
var marker;
map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    // Verificar se o clique está dentro dos limites de Los Angeles
    if (map.getBounds().contains(e.latlng) && laBounds.getBounds().contains(e.latlng)) {
        // Verifica se já existe um marcador, se sim, remove-o
        if (marker) {
            map.removeLayer(marker);
        }

        // Adiciona um novo marcador no local clicado
        marker = L.marker([lat, lng]).addTo(map);

        // Exibir janela de confirmação
        var confirmLocation = confirm("Você quer marcar este local como o local do evento?");
        
        if (confirmLocation) {
            // Exibir as coordenadas no parágrafo
            document.getElementById('coordinates').innerHTML = "Local marcado: Latitude: " + lat + ", Longitude: " + lng;
            // Aqui você pode fazer a requisição para o backend com as coordenadas
        } else {
            // Se o usuário cancelar, remove o marcador
            map.removeLayer(marker);
        }
    } else {
        // Exibir alerta caso o local esteja fora de Los Angeles
        alert("O local clicado está fora da área de Los Angeles, por favor escolha um local dentro da cidade.");
    }
});