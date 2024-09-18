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

// Função de geocodificação reversa usando a API do Nominatim para identificar a cidade
function reverseGeocode(lat, lng) {
    var url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            // Retornar o nome da cidade
            return data.address.city || data.address.town || data.address.village || "Desconhecido";
        });
}

// Função para registrar o clique do usuário no mapa e confirmar o local
var marker;
map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    // Verifica se já existe um marcador, se sim, remove-o
    if (marker) {
        map.removeLayer(marker);
    }

    // Adiciona um novo marcador no local clicado
    marker = L.marker([lat, lng]).addTo(map);

    // Executa a geocodificação reversa para identificar a cidade
    reverseGeocode(lat, lng).then(city => {
        if (city === "Los Angeles") {
            var confirmLocation = confirm("Você quer marcar este local como o local do evento?");
            if (confirmLocation) {
                document.getElementById('coordinates').innerHTML = "Local marcado em Los Angeles: Latitude: " + lat + ", Longitude: " + lng;
                // Aqui você pode fazer a requisição para o backend com as coordenadas
            } else {
                map.removeLayer(marker);
            }
        } else {
            // Se o local estiver fora de Los Angeles, remove o marcador e exibe um alerta
            map.removeLayer(marker);
            alert("O local clicado está fora de Los Angeles. Por favor, escolha um local dentro de Los Angeles.");
        }
    }).catch(error => {
        console.error("Erro na geocodificação reversa:", error);
        alert("Não foi possível determinar a cidade. Tente novamente.");
        map.removeLayer(marker);
    });
});