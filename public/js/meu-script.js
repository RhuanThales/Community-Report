//Autenticação do Firebase
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.email + " está logado!");
    //pegando dados no banco referentes ao usuario
    readUser(user);
    //pegando dados no banco referentes ao gestor
    readGestor(user);
	//pegando dados no banco referentes as ocorrencias
    readOcorrencias(user.email);	
    //
    document.getElementById("regEmail").value = user.email;
  } else {
    // Não há usuário logado
    console.log("Nenhum usuário está logado!");
  }
});

//Função que permite fazer o login de usuário com e-mail e senha já cadastrados
function login(){
	var userEmail = document.getElementById('inputEmail').value;
	var userSenha = document.getElementById('inputSenha').value;

	firebase.auth().signInWithEmailAndPassword(userEmail, userSenha).then(function(){
		//Em caso de sucesso redireciona para a página inicial
		//window.alert("Login com Sucesso!!!");
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
		//Em caso de sucesso redireciona para a página inicial
		//window.alert("Login com Sucesso!!!");
		window.open("gestor-principal.html", "_self");
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
		//window.alert("Logout com Sucesso!!!");
		window.open("index.html", "_self");
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
		createUser();
		window.alert("Você foi cadastrado com sucesso!");
		//window.open("index.html", "_self");
		console.log("Sucesso!");

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
	var userSenha = document.getElementById('inputSenha').value;

	firebase.auth().createUserWithEmailAndPassword(userEmail, userSenha).then(function(){
		//Em caso de sucesso salva-se os dados do gestor no banco de dados		
		createGestor();
		window.alert("Gestor cadastrado com sucesso!");
		//window.open("login-gestor.html", "_self");
		console.log("Sucesso!");

	}).catch(function(error) {
	  // Em caso de algum erro exibir uma mensagem com o erro que ocorreu.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  window.alert("Error: " + errorMessage);
	});
}	

//Variaveis usadas para criar um serial de números que servirão de id para cada objeto
var d = new Date();
var t = d.getTime();
var counter = t;
//Função que faz a criação do objeto e configura os valores de cada parametro de acordo com o que foi preenchido
//USUÁRIO
function createUser(){
	counter+=1;
	var user = {
		Id: counter,
		Nome: $("#inputNome").val(),
		Email: $("#inputEmail").val(),
		Prefeitura: $("#inputPrefeitura").val(),
		enderecoPrefeitura: "",
		sitePrefeitura: "",
		telefonePrefeitura: "",
		Rua: $("#inputRua").val(),
		Bairro: $("#inputBairro").val(),
		Numero: $("#inputNum").val(),
		Telefone: $("#inputTel").val(),
		CEP: $("#inputCep").val(),
		Cidade: $("#inputCidade").val(),
		Estado: $("#inputEstado").val()
	}
	let db = firebase.database().ref("Usuarios/" + counter);
	db.set(user).then(function(){
		//window.alert("Sucesso no registro da ocorrencia!");
		window.open("index.html", "_self");
	});
}
//Função que faz a criação do objeto e configura os valores de cada parametro de acordo com o que foi preenchido
//GESTOR
function createGestor(){
	counter+=1;
	var gestor = {
		Id: counter,
		Email: $("#inputEmail").val(),
		Nome: $("#inputNome").val(),
		Prefeitura: $("#inputPrefeitura").val(),
		Telefone: $("#inputTel").val(),
		Cidade: $("#inputCidade").val(),
		Estado: $("#inputEstado").val(),
		Setor: $("#inputSetor").val()
	}
	let db = firebase.database().ref("Gestores/" + counter);
	db.set(gestor).then(function(){
		//window.alert("Sucesso no registro da ocorrencia!");
		window.open("login-gestor.html", "_self");
	});;
}	

//Função que faz a criação do objeto e configura os valores de cada parametro de acordo com o que foi preenchido
//OCORRÊNCIAS
function createOcorrencia(){
	
	counter+=1;

	var ocorrencia = {
		regId: counter,
		imagemURL: "https://firebasestorage.googleapis.com/v0/b/c-report-refatoration.appspot.com/o/fotos-ocorrencias%2Fno-image.png?alt=media&token=141279db-adc4-4d87-a720-59871e10aa42",
		regProblema: $("#selectProblema").val(),
		regEmail: $("#regEmail").val(),
		regRua: $("#regRua").val(),
		regNumero: $("#regNum").val(),
		regBairro: $("#regBairro").val(),
		regCidade: $("#regCidade").val(),
		regEstado: $("#regEstado").val(),
		regDescricao: $("#regDescricao").val(),
		regSetor: $("#regSetor").val(),
		regStatus: "Não Resolvido"
	}
	
	let db = firebase.database().ref("Ocorrencias/" + counter);
	
	db.set(ocorrencia).then(function(){
		window.alert("Sucesso no registro da ocorrencia!");
		window.open("../ocorrencias.html", "_self");
	});
}

//Função que faz a criação do objeto e configura os valores de cada parametro de acordo com o que foi preenchido
//OCORRÊNCIAS (com foto)

//Função que pega os dados do usuário logado no app e mostra uma mensagem de bem vindo com seu nome
function readUser(user){
	
	var usuarioAtual = user.email;
	
	var userSigned = firebase.database().ref("Usuarios/");
	
	userSigned.orderByChild("Email").equalTo(usuarioAtual).on('value', function(data){
		
		data.forEach(function(child) {
    	
	    	var usuarioId = child.key;
	    	
	    	var usuario = child.val();

	    	if(usuario.Nome != ""){
	    		document.getElementById("userWelcome").innerHTML+=`
					<strong>${usuario.Nome}</strong>
				`
	    	}
		});
	});
}

//Função que pega os dados do gestor logado no app e mostra as respectivas informações do seu setor
function readGestor(user){

	var gestorAtual = user.email;

	var gestorSigned = firebase.database().ref("Gestores/");

	gestorSigned.orderByChild("Email").equalTo(gestorAtual).on('value', function(data){
		
		data.forEach(function(child) {
    	
	    	var gestorId = child.key;
	    	
	    	var gestor = child.val();

	    	if(gestor.Setor == "Obras Públicas"){
	    		document.getElementById("gestPrefInfo").innerHTML+=`
					<p><i><bold class="i_gestor">Prefeitura Municipal de ${gestor.Prefeitura} - Compromisso com o povo</bold></i></p>
					<img src="./imagens/logo/obras.jpg" alt="Logo imagem...">
					<p><i><bold class="i_gestor">Setor de ${gestor.Setor}</bold></i></p>
				`
				readOcorrenciasGestor(gestor.Setor);

	    	} else if(gestor.Setor == "Ouvidoria"){
	    		document.getElementById("gestPrefInfo").innerHTML+=`
					<p><i><bold class="i_gestor">Prefeitura Municipal de ${gestor.Prefeitura} - Compromisso com o povo</bold></i></p>
					<img src="./imagens/logo/ouvidoria.jpg" alt="Logo imagem...">
					<p><i><bold class="i_gestor">${gestor.Setor} do Município</bold></i></p>
				`
				readOcorrenciasGestor(gestor.Setor);

	    	} else if(gestor.Setor == "Trânsito"){
	    		document.getElementById("gestPrefInfo").innerHTML+=`
					<p><i><bold class="i_gestor">Prefeitura Municipal de ${gestor.Prefeitura} - Compromisso com o povo</bold></i></p>
					<img src="./imagens/logo/transito.jpg" alt="Logo imagem...">
					<p><i><bold class="i_gestor">Setor de ${gestor.Setor}, Transporte e Mobilidade Urbana</bold></i></p>
				`
				readOcorrenciasGestor(gestor.Setor);

	    	} else if(gestor.Setor == "Saúde"){
	    		document.getElementById("gestPrefInfo").innerHTML+=`
					<p><i><bold class="i_gestor">Prefeitura Municipal de ${gestor.Prefeitura} - Compromisso com o povo</bold></i></p>
					<img src="./imagens/logo/saude.jpg" alt="Logo imagem...">
					<p><i><bold class="i_gestor">Setor de ${gestor.Setor} Pública</bold></i></p>
				`
				readOcorrenciasGestor(gestor.Setor);
	    	}	
		});
	});
}

//Função que pega os dados das ocorrências no banco e os mostra na tela para o usuário
function readOcorrencias(emailUser){
	
	//var usuarioAtual = user.email;
	console.log(emailUser);
	
	var ocorr = firebase.database().ref("Ocorrencias/");

	ocorr.on("child_added", function(data){
		
		var ocorrValue = data.val();
		
		if(ocorrValue.regEmail == emailUser){
			
			if(ocorrValue.regStatus == "Resolvido"){
				document.getElementById("ocorrInfo").innerHTML+=`
				<div class="col-sm-4">	
					<div class="card">
						<img class="card-img-top" src="${ocorrValue.imagemURL}" alt="Card image...">
						<div class="card-body">
							<span class="badge badge-success">${ocorrValue.regStatus}</span>
							<h5 class="card-title">${ocorrValue.regProblema}</h5>
							<p class="card-text">Descrição: ${ocorrValue.regDescricao}</p>
							<p class="card-text">Endereço: Rua ${ocorrValue.regRua}, nº ${ocorrValue.regNumero} Bairro ${ocorrValue.regBairro}</p>
							<p class="card-text">Cidade: ${ocorrValue.regCidade}</p>
						</div>
						<div class="card-footer">
							<div class="btn-group" role="group" aria-label="Actions Buttons...">							
								<button type="button" class="btn btn-primary btnGp" onclick="editOcorrencia(${ocorrValue.regId}, '${ocorrValue.regProblema}', '${ocorrValue.regRua}', '${ocorrValue.regDescricao}', '${ocorrValue.regEmail}')">Editar Ocorrência</button>
								<button type="button" class="btn btn-primary btnGp" onclick="redoOcorrencia(${ocorrValue.regId}, '${ocorrValue.regEmail}')">Refazer Ocorrência</button>
							</div>
						</div>
					</div>
				</div>
			`
			} else if(ocorrValue.regStatus == "Em Andamento") {
				document.getElementById("ocorrInfo").innerHTML+=`
				<div class="col-sm-4">						
					<div class="card">
						<img class="card-img-top" src="${ocorrValue.imagemURL}" alt="Card image...">
						<div class="card-body">
							<span class="badge badge-warning">${ocorrValue.regStatus}</span>
							<h5 class="card-title">${ocorrValue.regProblema}</h5>
							<p class="card-text">Descrição: ${ocorrValue.regDescricao}</p>
							<p class="card-text">Endereço: Rua ${ocorrValue.regRua}, nº ${ocorrValue.regNumero} Bairro ${ocorrValue.regBairro}</p>
							<p class="card-text">Cidade: ${ocorrValue.regCidade}</p>
						</div>
						<div class="card-footer">
							<div class="btn-group" role="group" aria-label="Actions Buttons...">							
								<button type="button" class="btn btn-primary btnGp" onclick="editOcorrencia(${ocorrValue.regId}, '${ocorrValue.regProblema}', '${ocorrValue.regRua}', '${ocorrValue.regDescricao}', '${ocorrValue.regEmail}')">Editar Ocorrência</button>
								<button type="button" class="btn btn-primary btnGp" onclick="redoOcorrencia(${ocorrValue.regId}, '${ocorrValue.regEmail}')">Refazer Ocorrência</button>
							</div>
						</div>
					</div>
				</div>
			`
			} else if(ocorrValue.regStatus == "Não Resolvido") {
				document.getElementById("ocorrInfo").innerHTML+=`
				<div class="col-sm-4">					
					<div class="card">
						<img class="card-img-top" src="${ocorrValue.imagemURL}" alt="Card image...">
						<div class="card-body">
							<span class="badge badge-danger">${ocorrValue.regStatus}</span>
							<h5 class="card-title">${ocorrValue.regProblema}</h5>
							<p class="card-text">Descrição: ${ocorrValue.regDescricao}</p>
							<p class="card-text">Endereço: Rua ${ocorrValue.regRua}, nº ${ocorrValue.regNumero} Bairro ${ocorrValue.regBairro}</p>
							<p class="card-text">Cidade: ${ocorrValue.regCidade}</p>
						</div>
						<div class="card-footer">
							<div class="btn-group" role="group" aria-label="Actions Buttons...">							
								<button type="button" class="btn btn-primary btnGp" onclick="editOcorrencia(${ocorrValue.regId}, '${ocorrValue.regProblema}', '${ocorrValue.regRua}', '${ocorrValue.regDescricao}', '${ocorrValue.regEmail}')">Editar Ocorrência</button>
								<button type="button" class="btn btn-primary btnGp" onclick="redoOcorrencia(${ocorrValue.regId}, '${ocorrValue.regEmail}')">Refazer Ocorrência</button>
							</div>
						</div>
					</div>
				</div>
			`
			}
		}
	});
}

//Função que refaz, marca como não resolvida, a ocorrência selecionada pelo usuário para uma nova avaliação dos gestores
function redoOcorrencia(id, email){
	
	let db = firebase.database().ref("Ocorrencias/" + id + "/regStatus");
	db.set("Não Resolvido");

	document.getElementById("ocorrInfo").innerHTML=''
	readOcorrencias(email);
}

//Função que faz o update das informações referentes a ocorrência selecionada
function editOcorrencia(id, problema, local, descricao, email){
	//Abre o modal de edição
	$("#modalReOcorr").modal();
	//Define os valores para os campos de preenchimento
	document.getElementById("reOcorrReclamacao").value = problema;
	document.getElementById("reOcorrLocal").value = local;
	document.getElementById("reOcorrDesc").value = descricao;
	document.getElementById("reOcorrEmail").value = email;
	//Botão de confirmação do modal
	var btn = document.getElementById("yesButton");
	//Novos valores das informações editadas pelo usuário 
	var ocorrProblema = document.getElementById("reOcorrReclamacao");
	var ocorrLocal = document.getElementById("reOcorrLocal");
	var ocorrDescricao = document.getElementById("reOcorrDesc");
	var ocorrEmail = document.getElementById("reOcorrEmail");
	//Ação de editar somente ocorre quando se clica no botão "Editar" do modal
	$(btn).on("click", function(event){
		//Trocando o valor do primeiro atributo informado: "Problema"
		let db1 = firebase.database().ref("Ocorrencias/" + id + "/regProblema");
		db1.set(ocorrProblema.value);
		//Trocando o valor do segundo atributo informado: "Rua/Endereço"
		let db2 = firebase.database().ref("Ocorrencias/" + id + "/regRua");
		db2.set(ocorrLocal.value);
		//Trocando o valor do terceiro atributo informado: "Descrição"
		let db3 = firebase.database().ref("Ocorrencias/" + id + "/regDescricao");
		db3.set(ocorrDescricao.value);
		//Trocando o valor do quarto atributo informado: "E-mail"
		let db4 = firebase.database().ref("Ocorrencias/" + id + "/regEmail");
		db4.set(ocorrEmail.value);
		//Aqui se faz a atualização da informação na página, o usuário quase não percebe que teve um "reload"
		document.getElementById("ocorrInfo").innerHTML=''
		readOcorrencias(email);
	});
}

//Função que pega os dados das ocorrências no banco e os mostra na tela para o gestor
function readOcorrenciasGestor(setor){
	
	var ocorr = firebase.database().ref("Ocorrencias/");
	
	ocorr.on("child_added", function(data){
		
		var ocorrValue = data.val();
		
		if(ocorrValue.regSetor == setor){

			if(ocorrValue.regStatus == "Não Resolvido"){
				document.getElementById("ocorrFeed").innerHTML+=`
					<div class="col-sm-4">
						<div class="card">
							<img class="card-img-top" src="${ocorrValue.imagemURL}" alt="Card image...">
							<div class="card-body">
								<span class="badge badge-danger">${ocorrValue.regStatus}</span>
								<h5 class="card-title">${ocorrValue.regProblema}</h5>
								<p class="card-text">Descrição: ${ocorrValue.regDescricao}</p>
								<p class="card-text">Endereço: Rua ${ocorrValue.regRua}, nº ${ocorrValue.regNumero} Bairro ${ocorrValue.regBairro}</p>
								<p class="card-text">Cidade: ${ocorrValue.regCidade}</p>
							</div>
							<div class="card-footer">
								<div class="btn-group btn-group-sm" role="group" aria-label="Actions Buttons...">
									<button type="button" class="btn btn-success" onclick="updateOcorrencia(${ocorrValue.regId}, '${ocorrValue.regSetor}')"><strong>Realizada</strong></button>
									<button type="button" class="btn btn-warning" onclick="forwardOcorrencia(${ocorrValue.regId}, '${ocorrValue.regSetor}')"><strong>Encaminhar</strong></button>
									<button type="button" class="btn btn-secondary" onclick="changeSetorOcorr(${ocorrValue.regId}, '${ocorrValue.regSetor}')"><strong>Mudar Setor</strong></button>
									<button type="button" class="btn btn-danger" onclick="deleteOcorrencia(${ocorrValue.regId}, '${ocorrValue.regSetor}')"><strong>Excluir</strong></button>
								</div>
							</div>
						</div>
					</div>
				`
			} else if(ocorrValue.regStatus == "Em Andamento") {
				document.getElementById("ocorrFeed").innerHTML+=`
					<div class="col-sm-4">					
						<div class="card">
							<img class="card-img-top" src="${ocorrValue.imagemURL}" alt="Card image...">
							<div class="card-body">
								<span class="badge badge-warning">${ocorrValue.regStatus}</span>
								<h5 class="card-title">${ocorrValue.regProblema}</h5>
								<p class="card-text">Descrição: ${ocorrValue.regDescricao}</p>
								<p class="card-text">Endereço: Rua ${ocorrValue.regRua}, nº ${ocorrValue.regNumero} Bairro ${ocorrValue.regBairro}</p>
								<p class="card-text">Cidade: ${ocorrValue.regCidade}</p>
							</div>
							<div class="card-footer">
								<div class="btn-group btn-group-sm" role="group" aria-label="Actions Buttons...">									
									<button type="button" class="btn btn-success" onclick="updateOcorrencia(${ocorrValue.regId}, '${ocorrValue.regSetor}')"><strong>Realizada</strong></button>
									<button type="button" class="btn btn-warning" onclick="forwardOcorrencia(${ocorrValue.regId}, '${ocorrValue.regSetor}')"><strong>Encaminhar</strong></button>
									<button type="button" class="btn btn-secondary" onclick="changeSetorOcorr(${ocorrValue.regId}, '${ocorrValue.regSetor}')"><strong>Mudar Setor</strong></button>
									<button type="button" class="btn btn-danger" onclick="deleteOcorrencia(${ocorrValue.regId}, '${ocorrValue.regSetor}')"><strong>Excluir</strong></button>
								</div>
							</div>
						</div>
					</div>
				`
			}
		}
	});
}

//Função que atualiza o status da ocorrência para Resolvido
//A ocorrência é ocultada para o gestor e atualizada para o usuário
function updateOcorrencia(id, setor){

	let db = firebase.database().ref("Ocorrencias/" + id + "/regStatus");
	db.set("Resolvido");

	document.getElementById("ocorrFeed").innerHTML=''
	readOcorrenciasGestor(setor);
}

//Função que atualiza o status da ocorrência para Em Andamento
//A ocorrência será mostrada para ambos o gestor e usuário
function forwardOcorrencia(id, setor){

	let db = firebase.database().ref("Ocorrencias/" + id + "/regStatus");
	db.set("Em Andamento");

	document.getElementById("ocorrFeed").innerHTML=''
	readOcorrenciasGestor(setor);
}

//Função que atualiza o setor da ocorrência em caso dela ter sido encaminhada para o setor errado
function changeSetorOcorr(id, setor){

	$("#modalSetor").modal();

	var btn = document.getElementById("okButton");

	var setorSelected = document.getElementById("selectSetor");

	$(btn).on("click", function(event){
		let db = firebase.database().ref("Ocorrencias/" + id + "/regSetor");
		//Aqui se faz a seleção para qual setor será enviada a ocorrência
		console.log("Setor a enviar => " + setorSelected.value);
		db.set(setorSelected.value);
		document.getElementById("ocorrFeed").innerHTML=''
		readOcorrenciasGestor(setor);
	});

}

//Função que faz a remoção da ocorrência em caso de trote ou fakeNews
function deleteOcorrencia(id, setor){
	
	var ocorr = firebase.database().ref("Ocorrencias/" + id);
	ocorr.remove();

	document.getElementById("ocorrFeed").innerHTML=''
	readOcorrenciasGestor(setor);	
}