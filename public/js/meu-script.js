//Autenticação do Firebase
//Feito por Caio e Rhuan
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Há um usuário logado
  } else {
    // Não há usuário logado
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
		window.open("index.html", "_self");
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
		//Em cado de sucesso redireciona para a página de login
		window.alert("Cadastrado com Sucesso!!!");
		window.open("login-usuario.html", "_self");
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
		window.open("login-usuario.html", "_self");
	}).catch(function(error) {
	  // Em caso de algum erro exibir uma mensagem com o erro que ocorreu.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  window.alert("Error: " + errorMessage);
	});
}