//Autenticação do Firebase
//Feito por Caio e Rhuan
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //console.log("usuario logado: ", user);
    //pegando dados no banco referentes ao usuario
    queryDatabase(user);
  } else {
    // Não há usuário logado
    console.log("Nenhum usuario esta logado");
  }
});

//Função que permite fazer o login de usuário com e-mail e senha já cadastrados
//Feito por Caio e Rhuan
function login(){
	var userEmail = document.getElementById('inputEmail').value;
	var userSenha = document.getElementById('inputSenha').value;

	firebase.auth().signInWithEmailAndPassword(userEmail, userSenha).then(function(){
		//Em caso de sucesso redireciona para a página inicial (index.html)
		window.alert("Login com Sucesso!!!");
		window.open("pagina-principal.html", "_self");
	}).catch(function(error) {
	  // Em caso de algum erro exibir uma mensagem com o erro que ocorreu.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  window.alert("Error: " + errorMessage);
	});
}

//Função que cria um novo usuário com email e senha
//Feito por Caio e Rhuan
function sigin(){
	var userEmail = document.getElementById('inputEmail').value;
	var userSenha = document.getElementById('inputSenha').value;

	firebase.auth().createUserWithEmailAndPassword(userEmail, userSenha).then(function(){
		//Em caso de sucesso salva-se os dados do usuário no banco de dados
		var postKey = firebase.database().ref('Usuarios/').push().key;
		var updates = {};
		var postData = {
			Nome: $("#inputNome").val(),
			Email: $("#inputEmail").val(),
			Prefeitura: $("#inputPrefeitura").val(),
			Rua: $("#inputRua").val(),
			Bairro: $("#inputBairro").val(),
			Numero: $("#inputNum").val(),
			Telefone: $("#inputTel").val(),
			CEP: $("#inputCep").val(),
			Cidade: $("#inputCidade").val(),
			Estado: $("#inputEstado").val()
		};
		updates['/Usuarios/' + postKey] = postData;
		firebase.database().ref().update(updates);
		//Em cado de sucesso exibe a sequinte mensagem de confirmação
		window.alert("Cadastrado com Sucesso!!!");
		
		//Após salvar os dados do usuário redirecionar para a página de login
		window.open("index.html", "_self");

	}).catch(function(error) {
	  // Em caso de algum erro exibir uma mensagem com o erro que ocorreu.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  window.alert("Error: " + errorMessage);
	});
}		

//Função que permite que o usuário que esteja logado possa sair de sua conta
//Feito por Caio e Rhuan
function logout(){
	firebase.auth().signOut().then(function() {
		// Aqui o usuário foi deslogado com sucesso e portanto o usuário é redirecionado á página de login
		window.alert("Logout com Sucesso!!!");
		window.open("index.html", "_self");
	}).catch(function(error) {
	  // Em caso de algum erro exibir uma mensagem com o erro que ocorreu.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  window.alert("Error: " + errorMessage);
	});
}

//Função para pegar dados do banco e mostra-los na tela
var db = firebase.database().ref();
var RefUsers = db.child('Usuarios');
var infoPrefeitura = document.getElementById("infoPrefeitura");


function queryDatabase(user){

	queryDatabase = function(){}; //Evita que a função fique sendo chamada repetidas vezes

	var currentUser = user.email;

	console.log(currentUser);

	RefUsers.once('value').then(function(snapshot){
		
		var PostObject = snapshot.val();
		var keys = Object.keys(PostObject);
		var currentRow;
		
		for (var i = 0; i < keys.length; i++){
				
			var currentObject = PostObject[keys[i]];
			
			var userAtual = currentObject.Email;

			if(currentUser === userAtual){
				currentRow = document.createElement("div");
				//Criando paragrafos que contem as informações da chácara como nome cidade e endereço
				var nomePrefeitura = document.createElement("p");
				$(nomePrefeitura).addClass("prefeituraInfo");
				$(nomePrefeitura).html('Prefeitura de ' +  currentObject.Prefeitura);

				var enderecoPrefeitura = document.createElement("p");
				$(enderecoPrefeitura).addClass("prefeituraInfo");
				$(enderecoPrefeitura).html('Endereço: ' +  currentObject.enderecoPrefeitura);

				var telefonePrefeitura = document.createElement("p");
				$(telefonePrefeitura).addClass("prefeituraInfo");
				$(telefonePrefeitura).html('Telefones: ' + currentObject.telefonePrefeitura);

				var sitePrefeitura = document.createElement("a");
				$(sitePrefeitura).addClass("prefeituraInfo");
				$(sitePrefeitura).html('Site: ' + currentObject.sitePrefeitura);
				
				$('#infoPrefeitura').append(currentRow);
				$(currentRow).append(nomePrefeitura, enderecoPrefeitura, telefonePrefeitura, sitePrefeitura);
			}
		}
	});
}