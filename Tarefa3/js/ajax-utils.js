var $ajaxUtils = (function () {

    // retornar os metodos expostos
    return {
        sendGetRequest: sendGetRequest
    };

    // Retorna um objeto HTTP Request
    function RequestFactory() {
        // se XMLHttpRequest for disponível
        // retorne-o
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
            // senão, se ActiveXObject estiver disponível
            // retorne-o e passe por parâmetro Microsoft.XMLHTTP
        } else if (window.ActiveXObject) {
            return ActiveXObject("Microsoft.XMLHTTP");
            // caso nenhum desses seja disponível, emita um alerta e 
            // retorne nulo
        } else {
            alert("Ajax não está disponível!");
            return null;
        }
    }


    // Faz uma requisição Ajax GET para 'requestUrl'
    function sendGetRequest(requestUrl, responseHandler, isJsonResponse) {
        // recebemos o objeto gerado dinâmicamente
        // dependendo do navegador do usuário
        var request = new RequestFactory();
        // quando a requisição retornar
        request.onreadystatechange = 
        // execute a função anônima - 
        // que vai executar handleResponse com os parâmetros 
        function() { 
            handleResponse(request, responseHandler, isJsonResponse); 
        };
        // Configure o método da requisição para GET
        // e a URL passada por parâmetro
        request.open("GET", requestUrl, true);
        request.send(null); // só serve para POST
    }


    // Só chama a função 'responseHandler'
    // se a resposta estiver pronta
    // e não for um erro
    function handleResponse(request, responseHandler, isJsonResponse) {
        // Se a resposta já estiver pronta e o status for 200 (OK)
        // executa a função que foi passada por parâmetro
        if ((request.readyState == 4) && (request.status == 200)) {
            if (isJsonResponse === undefined) {
                // default é true
                isJsonResponse = true;
            }
            // Se receber um json, faça o parse
            if (isJsonResponse) {
                responseHandler(JSON.parse(request.responseText));
            } else { 
                responseHandler(request.responseText);
            }
        }
    }

})();