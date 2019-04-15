//Autenticação do Firebase
//Feito por Caio e Rhuan
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
var RefPref = db.child('Prefeituras');
var RefOcorr = db.child('Ocorrencias-Registradas');
var infoPrefeitura = document.getElementById("infoPrefeitura");
var infoOcorr = document.getElementById("infoOcorr");

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
				//Criando paragrafos que contem as informações da prefeitura como nome endereço e site
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

	//Pegando as informações de ocorrências registradas pelo usuário
	var currentOcorr = user.email;

	RefOcorr.once('value').then(function(snapshot){
		
		var PostObject = snapshot.val();
		var keys = Object.keys(PostObject);	
		var currentRow;
		
		for (var i = 0; i < keys.length; i++){				
			var currentObject = PostObject[keys[i]];			
			var userOcorr = currentObject.regEmail;
			//console.log(userOcorr);

			if(currentOcorr === userOcorr){				
				currentTable = document.createElement("tbody");
				currentRow = document.createElement("tr");

				//Criando paragrafos que contem as informações das ocorrências como problema, descrição e endereço
				var ocorrProblema = document.createElement("td");
				$(ocorrProblema).addClass("ocorrInfo");
				$(ocorrProblema).html(currentObject.regDescricaoS);

				var ocorrEndereco = document.createElement("td");
				$(ocorrEndereco).addClass("ocorrInfo");
				$(ocorrEndereco).html(currentObject.regRua + ", " + "nº " + currentObject.regNumero + ", " + currentObject.regBairro);
				
				var ocorrIconV = document.createElement("i");
				$(ocorrIconV).addClass("fas fa-check");

				var ocorrIconX = document.createElement("i");
				$(ocorrIconX).addClass("fas fa-times");

				var ocorrStatus = document.createElement("td");
				$(ocorrStatus).addClass("ocorrInfo");
				$(ocorrStatus).append(ocorrIconX);

				var btnOcorr = document.createElement("button");
				$(btnOcorr).addClass("btn btn-primary");
				btnOcorr.innerHTML = 'Reclamar Novamente';
				$(btnOcorr).on("click", function(event){
					window.alert("Sua Solicitação foi renovada!");
				});

				var ocorrBtn = document.createElement("td");
				$(ocorrBtn).addClass("ocorrInfo");
				$(ocorrBtn).append(btnOcorr);

				$('#infoOcorr').append(currentTable);
				$(currentTable).append(currentRow);
				$(currentRow).append(ocorrProblema, ocorrEndereco, ocorrStatus, ocorrBtn);
			}
		}
	});
}

//Função para redirecionar a pagina de registro de ocorrencias
$(document).ready(function(){
	$("#occorDiv").show();
	$("#regDiv").hide();
	$("#menuDiv").show();
	$("#returnArrow").show();
	$("#backArrow").hide();
	$("#btnRegistrarOcorr").hide();
	$("#btnRegOcorrencia").show();
});

var btnRegAnimal = document.getElementById('btnRegAnimal');
var btnRegArvore = document.getElementById('btnRegArvore');
var btnRegBuraco = document.getElementById('btnRegBuraco');
var btnRegInseto = document.getElementById('btnRegInseto');
var btnRegLampada = document.getElementById('btnRegLampada');
var btnRegLimpeza = document.getElementById('btnRegLimpeza');
var btnRegLote = document.getElementById('btnRegLote');
var btnRegBarulho = document.getElementById('btnRegBarulho');
var btnRegSinal = document.getElementById('btnRegSinal');
var btnRegAgua = document.getElementById('btnRegAgua');
var btnRegOutros = document.getElementById('btnRegOutros');
//var btnRegOuvidoria = document.getElementById('btnRegOuvidoria');
var btnBackArrow = document.getElementById('backArrow');

btnRegAnimal.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").show();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegArvore.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").show();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegBuraco.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").show();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegInseto.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").show();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegLampada.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").show();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegLimpeza.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").show();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegLote.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").show();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegBarulho.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").show();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegSinal.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").show();
	$("#selectAgua").hide();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegAgua.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").show();
	$("#descSimples").show();
	$("#descCompleta").hide();
	$("#descLabelC").hide();
});
btnRegOutros.addEventListener('click', function(){
	$("#ocorrDiv").hide();
	$("#regDiv").show();
	$("#menuDiv").hide();
	$("#returnArrow").hide();
	$("#backArrow").show();
	$("#probLabel").hide();
	$("#selectAnimal").hide();
	$("#selectArvore").hide();
	$("#selectBuraco").hide();
	$("#selectLampada").hide();
	$("#selectLimpeza").hide();
	$("#selectLote").hide();
	$("#selectInseto").hide();
	$("#selectBarulho").hide();
	$("#selectSinal").hide();
	$("#selectAgua").hide();
	$("#descSimples").hide();
	$("#descCompleta").show();
	$("#descLabelS").hide();
});

//Função para salvar os dados da ocorrência no banco do firebase
var selectedFile;

document.getElementById("upload").addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
	selectedFile = event.target.files[0];
	$("#btnRegistrarOcorr").show();
	$("#btnRegOcorrencia").hide();
};

//Função para salvar os dados da ocorrências com a url da imagem selecionada e salvar a imagem no storege do firebase na pasta apropriada
function regOcorrencia() {
	//Criando uma referencia ao root
	var filename = selectedFile.name;
	var storageRef = firebase.storage().ref('/fotos-ocorrencias/' + filename);
	var uploadTask = storageRef.put(selectedFile);

	uploadTask.on('state_changed', function(snapshot){

	},function(error){
		//Em caso de der algum erro ao enviar os dados
		var errorCode = error.code;
		var errorMessage = error.message;
		window.alert("Error: " + errorMessage);
	
	},function(){
		//Em caso de sucesso ao enviar os dados
		var postKey = firebase.database().ref('Ocorrencias-Registradas/').push().key;
		var downloadURL = uploadTask.snapshot.downloadURL;
		var updates = {};
		var postData = {
			imagemURL: downloadURL,
			regProblema1: $("#selectAnimal").val(),
			regProblema2: $("#selectArvore").val(),
			regProblema3: $("#selectBuraco").val(),
			regProblema4: $("#selectLampada").val(),
			regProblema5: $("#selectLimpeza").val(),
			regProblema6: $("#selectLote").val(),
			regProblema7: $("#selectInseto").val(),
			regProblema8: $("#selectBarulho").val(),
			regProblema9: $("#selectSinal").val(),
			regProblema0: $("#selectAgua").val(),
			regEmail: $("#regEmail").val(),
			regRua: $("#regRua").val(),
			regNumero: $("#regNum").val(),
			regBairro: $("#regBairro").val(),
			regCidade: $("#regCidade").val(),
			regEstado: $("#regEstado").val(),
			regDescricaoS: $("#descSimples").val(),
			regDescricaoC: $("#descCompleta").val()
		};
		updates['/Ocorrencias-Registradas/' + postKey] = postData;
		firebase.database().ref().update(updates);
		//Apos salvar os dados o formulario de preenchimento é ocultado
		window.alert("Sucesso no registro da ocorrencia!!!");
		window.open("ocorrencias.html", "_self");
	});
}

//Função que salva a ocorrência registrada, sem colocar foto, no banco de dados
function regOcorr(){
	var postKey = firebase.database().ref('Ocorrencias-Registradas/').push().key;
	var updates = {};
	var postData = {
		regProblema1: $("#selectAnimal").val(),
		regProblema2: $("#selectArvore").val(),
		regProblema3: $("#selectBuraco").val(),
		regProblema4: $("#selectLampada").val(),
		regProblema5: $("#selectLimpeza").val(),
		regProblema6: $("#selectLote").val(),
		regProblema7: $("#selectInseto").val(),
		regProblema8: $("#selectBarulho").val(),
		regProblema9: $("#selectSinal").val(),
		regProblema0: $("#selectAgua").val(),
		regEmail: $("#regEmail").val(),
		regRua: $("#regRua").val(),
		regNumero: $("#regNum").val(),
		regBairro: $("#regBairro").val(),
		regCidade: $("#regCidade").val(),
		regEstado: $("#regEstado").val(),
		regDescricaoS: $("#descSimples").val(),
		regDescricaoC: $("#descCompleta").val()
	};
	updates['/Ocorrencias-Registradas/' + postKey] = postData;
	firebase.database().ref().update(updates);
	//Apos salvar os dados o formulario de preenchimento é ocultado
	window.alert("Sucesso no registro da ocorrencia!!!");
	window.open("ocorrencias.html", "_self");
}