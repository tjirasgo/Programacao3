var dataUrl = "dados/dados.json",
    itensHtml = "ajax-load.html",    
    menuHtml = "ajax-load-lista.html";
    
// função facilitadora para inserir HTML em um elemento
function insereHtml(seletor, html) {
  var elemento = document.querySelector(seletor);
  console.log(html);
  elemento.innerHTML = html;
}

// substitui propriedade {{propName}} dentro de um 
// 'template', e substitui por seu propValue
function inserePropriedade(template, propName, propValue) {
  // criar {{propName}}
  // trocar (replace), dentro de template, {{propName}} por propValue
  // retornar o template alterado
  var propriedade = "{{" + propName + "}}";
  // substitui todas as ocorrências de propriedade por propValue
  // em template
  template = template.replace(new RegExp(propriedade, "g"),
              propValue);
  return template;
}

// constroi a pagina, com os dados recebidos por parametro
function constroiPagina(dados) {
  var htmlFinal = '<div clas="col-xs-12">'; // string que vai conter todo o HTML
  // construimos os itens agora
  $ajaxUtils.sendGetRequest(itensHtml, function(itensHtml) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var html = itensHtml,
          titulo = dados[i].titulo,
          conteudo = dados[i].conteudo;
          
      html = inserePropriedade(html, "titulo", titulo);
      html = inserePropriedade(html, "conteudo", conteudo);
      
      htmlFinal += html;
    }
    htmlFinal += '</div>';
    insereHtml("#content", htmlFinal);
  }, false); // não é um JSON

  var menuHtmlFinal = ''; // string que vai conter todo o HTML
  $ajaxUtils.sendGetRequest(menuHtml, function(menuHtml) {
    for (var i = 0, max = dados.length; i < max; i++) {
      var html = menuHtml,
          titulo = dados[i].titulo;
          
      html = inserePropriedade(html, "titulo", titulo);
      
      menuHtmlFinal += html;
    }
    insereHtml("ul", menuHtmlFinal);
  }, false); // não é um JSON
}
// vamos construir o sendGetRequest:
// definir a URL (dataUrl)
// e o metodo constroiPagina
$ajaxUtils.sendGetRequest(dataUrl, constroiPagina);