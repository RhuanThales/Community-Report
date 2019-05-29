//Autenticação do Firebase
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //pegando dados no banco referentes ao usuario
    queryDatabase(user);
  } else {
    // Não há usuário logado
    console.log("Nenhum usuario esta logado");
  }
});

//Função que permite fazer o login de usuário com e-mail e senha já cadastrados
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
//Função que permite fazer o login de gestor com e-mail e senha já cadastrados
function loginGestor(){
	var userEmail = document.getElementById('inputEmail').value;
	var userSenha = document.getElementById('inputSenha').value;

	firebase.auth().signInWithEmailAndPassword(userEmail, userSenha).then(function(){
		//Em caso de sucesso redireciona para a página inicial (index.html)
		window.alert("Login com Sucesso!!!");
		window.open("gestor-principal.html", "_self");
	}).catch(function(error) {
	  // Em caso de algum erro exibir uma mensagem com o erro que ocorreu.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  window.alert("Error: " + errorMessage);
	});
}

//Função que cria um novo usuário com email e senha
function sigin(){
	var userEmail = document.getElementById('inputEmail').value;
	var userSenha = document.getElementById('inputSenha').value;

	firebase.auth().createUserWithEmailAndPassword(userEmail, userSenha).then(function(){
		//Em caso de sucesso salva-se os dados do usuário no banco de dados		
		var db = firebase.database().ref();
		var RefPref = db.child('Prefeituras');

		var currentPref = document.getElementById('inputPrefeitura').value;

		RefPref.once('value').then(function(snapshot){
			
			var PostObject = snapshot.val();
			var keys = Object.keys(PostObject);
			
			for (var i = 0; i < keys.length; i++){
					
				var currentObject = PostObject[keys[i]];
				
				var userPref = currentObject.Prefeitura;

				if(currentPref === userPref){
					var postKey = firebase.database().ref('Usuarios/').push().key;
					var updates = {};
					var postData = {
						Nome: $("#inputNome").val(),
						Email: $("#inputEmail").val(),
						Prefeitura: $("#inputPrefeitura").val(),
						enderecoPrefeitura: currentObject.enderecoPrefeitura,
						sitePrefeitura: currentObject.sitePrefeitura,
						telefonePrefeitura: currentObject.telefonePrefeitura,
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
				}
			}
		})
	}).catch(function(error) {
	  // Em caso de algum erro exibir uma mensagem com o erro que ocorreu.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  window.alert("Error: " + errorMessage);
	});
}		

//Função que cria um novo gestor com email e senha
function siginGestor(){
	var userEmail = document.getElementById('inputEmail').value;
	var userSenha = document.getElementById('inputSenha1').value;

	firebase.auth().createUserWithEmailAndPassword(userEmail, userSenha).then(function(){
		//Em caso de sucesso salva-se os dados do usuário no banco de dados		
		var postKey = firebase.database().ref('Gestores/').push().key;
		var updates = {};
		var postData = {
			Email: $("#inputEmail").val(),
			Nome: $("#inputNome").val(),
			Prefeitura: $("#inputPrefeitura").val(),
			Telefone: $("#inputTel").val(),
			Cidade: $("#inputCidade").val(),
			Estado: $("#inputEstado").val(),
			Setor: $("#inputSetor").val()
		};
		updates['/Gestores/' + postKey] = postData;
		firebase.database().ref().update(updates);
		//Em cado de sucesso exibe a sequinte mensagem de confirmação
		window.alert("Gestor Cadastrado com Sucesso!!!");
		
		//Após salvar os dados do usuário redirecionar para a página de login
		window.open("login-gestor.html", "_self");
	}).catch(function(error) {
	  // Em caso de algum erro exibir uma mensagem com o erro que ocorreu.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  window.alert("Error: " + errorMessage);
	});
}	

//Função que permite que o usuário que esteja logado possa sair de sua conta
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
var RefPref = db.child('Prefeituras');
var RefGestor = db.child('Gestores');
var RefOcorr = db.child('Ocorrencias-Registradas');
var RefOcorrGestor = db.child('Ocorrencias-Registradas');
var RefReOcorr = db.child('Ocorrencias-Refeitas');
var infoPrefeitura = document.getElementById("infoPrefeitura");
var prefNome = document.getElementById("prefNome");
var infoOcorr = document.getElementById("infoOcorr");

function queryDatabase(user){

	queryDatabase = function(){}; //Evita que a função fique sendo chamada repetidas vezes

	var currentUser = user.email;
	//console.log(currentUser);
	RefUsers.once('value').then(function(snapshot){
		
		var PostObject = snapshot.val();
		var keys = Object.keys(PostObject);
		var currentRow;
		
		for (var i = 0; i < keys.length; i++){		
			var currentObject = PostObject[keys[i]];			
			var userAtual = currentObject.Email;
			var resultado = userAtual.toLowerCase();
			if(currentUser === resultado){
				currentRow = document.createElement("div");
				//Criando paragrafos que contem as informações da prefeitura como nome endereço e site
				var nomePrefeitura = document.createElement("p");
				$(nomePrefeitura).addClass("prefeituraInfo");
				$(nomePrefeitura).html('Prefeitura de ' +  currentObject.Prefeitura);
				//
				var enderecoPrefeitura = document.createElement("p");
				$(enderecoPrefeitura).addClass("prefeituraInfo");
				$(enderecoPrefeitura).html('Endereço: ' +  currentObject.enderecoPrefeitura);
				//
				var telefonePrefeitura = document.createElement("p");
				$(telefonePrefeitura).addClass("prefeituraInfo");
				$(telefonePrefeitura).html('Telefones: ' + currentObject.telefonePrefeitura);
				//
				var sitePrefeitura = document.createElement("a");
				$(sitePrefeitura).addClass("prefeituraInfo");
				$(sitePrefeitura).html('Site: ' + currentObject.sitePrefeitura);
				sitePrefeitura.href = currentObject.sitePrefeitura;
				sitePrefeitura.target = "_blank";
				//				
				$('#infoPrefeitura').append(currentRow);
				$(currentRow).append(nomePrefeitura, enderecoPrefeitura, telefonePrefeitura, sitePrefeitura);
				//
				var prefeitura = currentObject.Prefeitura;
				
				console.log(prefeitura);
				
				var prefSaoGot = "São Gotardo";
				var prefDucks = "Patos de Minas";
				var prefBh = "Belo Horizonte";
				var prefUber = "Uberlândia";
				var prefPo = "Presidente Olegário";
				//Redirecionando para a pagina de informações dos setores publicos de acordo com a prefeitura do usuario
				$("#setorBtn").on("click", function(event){
					if (prefeitura === prefDucks) {
						window.open("setores-publicos-patos-de-minas.html", "_self");
					} if (prefeitura === prefSaoGot) {
						window.open("setores-publicos-sao-gotardo.html", "_self");
					} if (prefeitura === prefBh) {
						window.open("setores-publicos-belo-horizonte.html", "_self");
					} if (prefeitura === prefUber) {
						window.open("setores-publicos-uberlandia.html", "_self");
					} if (prefeitura === prefPo) {
						window.open("setores-publicos-presidente-olegario.html", "_self");
					}
				});
			}
		}
	});

	//Vereficação de gestores (faz verificações pela tabela de gestores no banco de dados)
	var currentGestor = user.email;
	
	console.log(currentGestor);
	
	RefGestor.once('value').then(function(snapshot){
		
		var PostObject = snapshot.val();
		var keys = Object.keys(PostObject);
		var currentRow;
		
		for (var i = 0; i < keys.length; i++){		
			var currentObject = PostObject[keys[i]];			
			var gestorAtual = currentObject.Email;
			var convert = gestorAtual.toLowerCase();
			//console.log(convert);
			if(currentGestor === convert){
				var prefeitura = currentObject.Prefeitura;
				var setor = currentObject.Setor;
				console.log(prefeitura);
				console.log(setor);
				
				//Chamando a função que faz o carregamento das ocorrencias para a tela
				gestorQuery(prefeitura,setor);
	
				var prefDucks = "Patos de Minas";
				var prefSaoGot = "São Gotardo";
				var prefBh = "Belo Horizonte";
				var prefUber = "Uberlândia";
				var prefPo = "Presidente Olegário";

				var obras = "Obras Públicas";
				var ouvidoria = "Ouvidoria";
				var saude = "Saúde";
				var transito = "Trânsito";

				//Verificações de prefeitura e de setor
				if (prefeitura === prefDucks && setor === obras)
				{
					var imagemPref = document.createElement("img");
					$(imagemPref).addClass("imgPref");
					imagemPref.src = "./imagens/logo/OPublicas.jpg";

					$('#gestPrefInfo').append(imagemPref);
					
					$('#prefNome').html("Prefeitura de " + currentObject.Prefeitura + " - " + "Secretaria Municipal de Obras Públicas");
				}
				if (prefeitura === prefDucks && setor === ouvidoria)
				{
					var imagemPref = document.createElement("img");
					$(imagemPref).addClass("imgPref");
					imagemPref.src = "./imagens/logo/ouvidoria.jpg";

					$('#gestPrefInfo').append(imagemPref);

					$('#prefNome').html("Prefeitura de " + currentObject.Prefeitura + " - " + "Ouvidoria Municipal");
				} 
				if (prefeitura === prefDucks && setor === saude)
				{
					var imagemPref = document.createElement("img");
					$(imagemPref).addClass("imgPref");
					imagemPref.src = "./imagens/logo/saude.jpg";

					$('#gestPrefInfo').append(imagemPref);

					$('#prefNome').html("Prefeitura de " + currentObject.Prefeitura + " - " + "Secretaria Municipal de Saúde");
				}
				if (prefeitura === prefDucks && setor === transito)
				{
					var imagemPref = document.createElement("img");
					$(imagemPref).addClass("imgPref");
					imagemPref.src = "./imagens/logo/mobilidade.jpg";

					$('#gestPrefInfo').append(imagemPref);

					$('#prefNome').html("Prefeitura de " + currentObject.Prefeitura + " - " + "Secretaria Municipal de Trânsito, Transporte e Mobilidade");
				}
			}
		}
	});

	//Pegando as informações de ocorrências registradas pelo usuário
	var currentOcorr = user.email;
	
	RefOcorr.once('value').then(function(snapshot){
		
		var PostObject = snapshot.val();
		var keys = Object.keys(PostObject);	
		var currentRow;
		for (var i = 0; i < keys.length; i++){					
			var currentObject = PostObject[keys[i]];				
			var userOcorr = currentObject.regEmail;
			var result = userOcorr.toLowerCase();
			if(currentOcorr === result){				
				//
				currentRow = document.createElement("tr");
				//Criando paragrafos que contem as informações das ocorrências como: problema, descrição e endereço
				var ocorrProblema = document.createElement("td");
				$(ocorrProblema).addClass("ocorrInfo");
				$(ocorrProblema).html(currentObject.regDescricaoS);
				//
				var ocorrEndereco = document.createElement("td");
				$(ocorrEndereco).addClass("ocorrInfo");
				$(ocorrEndereco).html(currentObject.regRua);
				//
				var ocorrIconV = document.createElement("i");
				$(ocorrIconV).addClass("fas fa-check");
				//
				var ocorrIconX = document.createElement("i");
				$(ocorrIconX).addClass("fas fa-times");
				//
				var ocorrIconZ = document.createElement("i");
				$(ocorrIconZ).addClass("fas fa-chalkboard-teacher");
				//Fazendo a checagem do status da ocorrência para a exibição do icone correto (v para atendidas e x para as não atendidas)
				if (currentObject.regStatus === "Resolvido") {
					var ocorrSatus = document.createElement("td");
					$(ocorrSatus).addClass("ocorrInfo");
					$(ocorrSatus).append(ocorrIconV);
				} if (currentObject.regStatus === "Em andamento"){
					var ocorrSatus = document.createElement("td");
					$(ocorrSatus).addClass("ocorrInfo");
					$(ocorrSatus).append(ocorrIconZ);
				} if (currentObject.regStatus === "Não Resolvido"){
					var btnOcorr = document.createElement("button");
					$(btnOcorr).addClass("btn btn-primary btnInfoOcorr");
					$(btnOcorr).append(ocorrIconX);
					$(btnOcorr).on("click", function(event){
						$("#modalReOcorr").modal("show");
					});
					var ocorrSatus = document.createElement("td");
					$(ocorrSatus).addClass("ocorrInfo");
					$(ocorrSatus).append(btnOcorr);
				}
				$('#infoOcorr').append(currentRow);
				$(currentRow).append(ocorrProblema, ocorrEndereco, ocorrSatus);
			}
		}
	});
}

function gestorQuery(prefeitura,setor){

	RefOcorrGestor.once('value').then(function(snapshot){

		var PostObject = snapshot.val();
		var keys = Object.keys(PostObject);	
		var currentRow;
		
		for (var i = 0; i < keys.length; i++){					
			var currentObject = PostObject[keys[i]];				

			//Pegar informações do banco e mostra-las para o gestor na tela principal
			if (i % 1 == 0) {

				var ocorrPref = currentObject.regCidade;
				var ocorrSetor = currentObject.regSetor;

				if(prefeitura === ocorrPref && setor === ocorrSetor){
					currentRowOcorr = document.createElement("div");
					$(currentRowOcorr).addClass("row");
					li = document.createElement("li");
					$(li).addClass("ocorrLi");				
					$(li).append(currentRowOcorr);

					var col1 = document.createElement("div");
					$(col1).addClass("col-md-6");
					
					var col2 = document.createElement("div");
					$(col2).addClass("col-md-6");
					$(col2).addClass("ocorrDiv");

					var cardDiv = document.createElement("div");
					$(cardDiv).addClass("card"); //Add aqui a imagem a a outra div

					var cardBody = document.createElement("div");
					$(cardBody).addClass("card-body"); //Add aqui um h5 (card-title) e um p (card-text) e os botoes

					//Criando div's para que possam ser colocados alguns itens dentro delas			
					var ocorrDiv1 = document.createElement("div");
					$(ocorrDiv1).addClass("ocorrDiv1");

					var ocorr0 = currentObject.regProblema0; // Agua
					var ocorr1 = currentObject.regProblema1; // Animal
					var ocorr2 = currentObject.regProblema2; // Arvore
					var ocorr3 = currentObject.regProblema3; // Buraco
					var ocorr4 = currentObject.regProblema4; // Lampada
					var ocorr5 = currentObject.regProblema5; // Limpeza
					var ocorr6 = currentObject.regProblema6; // Lote
					var ocorr7 = currentObject.regProblema7; // Inseto
					var ocorr8 = currentObject.regProblema8; // Barulho
					var ocorr9 = currentObject.regProblema9; // Sinalização
					var ocorr10 = currentObject.regDescricaoC; //Outros

					if (ocorr0 != "Null") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);

						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						ocorrActionBtn3.id = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");

						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
					if (ocorr1 != "Null") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);
						//
						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						var idTeste = currentObject.idOcorr;
						console.log(idTeste);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						//ocorrActionBtn3.id = currentObject.idOcorr;
						//ocorrActionBtn3.setAttribute('btnid', currentObject.idOcorr);
						ocorrActionBtn3.value = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");
						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
					if (ocorr2 != "Null") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);
						//
						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						ocorrActionBtn3.id = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");
						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
					if (ocorr3 != "Null") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);
						//
						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						ocorrActionBtn3.id = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");
						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
					if (ocorr4 != "Null") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);
						//
						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						ocorrActionBtn3.id = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");
						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
					if (ocorr5 != "Null") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);
						//
						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						ocorrActionBtn3.id = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");
						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
					if (ocorr6 != "Null") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);
						//
						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						ocorrActionBtn3.id = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");
						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
					if (ocorr7 != "Null") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);
						
						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						ocorrActionBtn3.id = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");
						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
					if (ocorr8 != "Null") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);
						//
						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						ocorrActionBtn3.id = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");
						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
					if (ocorr9 != "Null") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);
						//
						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						ocorrActionBtn3.id = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");
						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
					if (ocorr10 != "") {
						//Criando o elemento da imagem e definindo seu src pelo url da imagem salva pelo usuario no banco de dados
						var ocorrImage = document.createElement("img");
						if(currentObject.imagemURL != null){
							ocorrImage.src = currentObject.imagemURL;
						} else {
							ocorrImage.src = "./imagens/logo/no-image.png";
						}
						$(ocorrImage).addClass("contentImage");
						//Criando elementos dos paragrafos contendo as informações necessarias
						var ocorrProb = document.createElement("p");
						$(ocorrProb).addClass("ocorrInfo");
						$(ocorrProb).html(currentObject.regDescricaoS);
						//
						var ocorrEnd = document.createElement("p");
						$(ocorrEnd).addClass("ocorrInfo");
						$(ocorrEnd).html(currentObject.regRua);

						//Criação dos botões para o gerenciamento das ocorrências
						var ocorrActionBtn1 = document.createElement("button");
						ocorrActionBtn1.innerHTML = 'Resolvido';
						$(ocorrActionBtn1).addClass("btn btn-success");
						$(ocorrActionBtn1).on("click", function(event){
							window.alert("Marcado como resolvido!");
						});
						var ocorrActionBtn2 = document.createElement("button");
						ocorrActionBtn2.innerHTML = 'Em andamento';
						$(ocorrActionBtn2).addClass("btn btn-warning");
						$(ocorrActionBtn2).on("click", function(event){
							window.alert("Marcado como em andamento!");
						});
						var ocorrActionBtn3 = document.createElement("button");
						ocorrActionBtn3.innerHTML = 'Não resolvido';
						ocorrActionBtn3.id = currentObject.idOcorr;
						$(ocorrActionBtn3).addClass("btn btn-danger");
						$(ocorrActionBtn3).on("click", function(event){
							window.alert("Marcado como não resolvido!");
						});
						//
						var divBtn = document.createElement("div");
						$(divBtn).addClass("btn-group");
						divBtn.role = "group";
						$(divBtn).append(ocorrActionBtn1, ocorrActionBtn2, ocorrActionBtn3);

						$('#ocorrFeed').append(li);
						$(col1).append(ocorrImage);
						$(ocorrDiv1).append(ocorrProb, ocorrEnd);
						$(col2).append(ocorrDiv1, divBtn);	
						$(currentRowOcorr).append(col1, col2);
					}
				}
			}
		}
	});
}

//Funções para se refazer as ocorrências que ainda não foram solucionadas pelo setor responsavel
function fazerReOcorr(){
	var postKey = firebase.database().ref('Ocorrencias-Refeitas/').push().key;
	var updates = {};
	var postData = {
		regProblema: $("#reOcorrReclamacao").val(),
		regEmail: $("#reOcorrEmail").val(),
		regLocal: $("#reOcorrLocal").val(),
		regDescricaoS: $("#reOcorrDesc").val(),
		regSetor: "Ouvidoria",
		regStatus: "Não Resolvido"
	};
	updates['/Ocorrencias-Refeitas/' + postKey] = postData;
	firebase.database().ref().update(updates);
	//Após salvar os dados no Banco o formulario é escondido
	window.alert("Sua ocorrência foi refeita!");
	
	$("#reOcorrReclamacao").val("");
	$("#reOcorrEmail").val("");
	$("#reOcorrLocal").val("");
	$("#reOcorrDesc").val("");
}