$.setDataPost = function(){
	var result = { queue : Cookies.get("queueCurrent")};
	return result;
};

$.setAgentes = function(data){
	//Cargar agentes
	$.each( data, function( i, val ) {
		var canal = val.agentchannel.split('/');
		Cookies.set('agentstatus-'+canal[1], val.agentstatus);

		//Tiempos agentes
		var total_convers = val.sec_calls;
		var total_break = val.total_break;
		var total_espera = (val.total_sessions - total_convers) - total_break;
		total_convers = total_convers.toString().toHHMMSS();
		total_break = total_break.toString().toHHMMSS();
		total_espera = total_espera.toString().toHHMMSS();
		
		if(val.agentstatus === 'offline'){
			$( "#cont_agent").append('<tr class="'+val.classrow+'" id="rowagent-'+canal[1]+'"><td><center>'+canal[1]+'</center></td><td><center>'+val.agentname+'</center></td><td class="agentstatus" id="agentstatus-'+canal[1]+'" data-agentstatus="'+val.agentstatus+'">'+val.agentstatus_es+'</td></tr>');
			$( "#cont_agent_atendidas").append('<tr class="'+val.classrow+'" id="rowatendidasagente-'+canal[1]+'"><td class="num_calls" id="num_calls-'+canal[1]+'" data-num_calls="'+val.num_calls+'">'+val.num_calls+'</td></tr>');
			$( "#cont_agent_time").append('<tr class="'+val.classrow+'" id="rowtime-'+canal[1]+'"><td class="total_convers" id="total_convers-'+canal[1]+'" data-sec_calls="'+val.sec_calls+'">'+total_convers+'</td><td id="total_espera-'+canal[1]+'">'+total_espera+'</td><td id="total_break-'+canal[1]+'">'+total_break+'</td></tr>');
		}else{
			$( "#cont_agent").prepend('<tr class="'+val.classrow+'" id="rowagent-'+canal[1]+'"><td><center>'+canal[1]+'</center></td><td><center>'+val.agentname+'</center></td><td class="agentstatus" id="agentstatus-'+canal[1]+'" data-agentstatus="'+val.agentstatus+'">'+val.agentstatus_es+'</td></tr>');
			$( "#cont_agent_atendidas").prepend('<tr class="'+val.classrow+'" id="rowatendidasagente-'+canal[1]+'"><td class="num_calls" id="num_calls-'+canal[1]+'" data-num_calls="'+val.num_calls+'">'+val.num_calls+'</td></tr>');
			$( "#cont_agent_time").prepend('<tr class="'+val.classrow+'" id="rowtime-'+canal[1]+'"><td class="total_convers" id="total_convers-'+canal[1]+'" data-sec_calls="'+val.sec_calls+'">'+total_convers+'</td><td id="total_espera-'+canal[1]+'">'+total_espera+'</td><td id="total_break-'+canal[1]+'">'+total_break+'</td></tr>');
		}

	});
	return true;
};

$.setEstadosAgentes = function(result){
	$.each( result, function( i, val ) {
		var canal = val.agentchannel.split('/');
		/*var agentstatusCurrent = Cookies.get("#agentstatus-" + canal['1']);*/
		var agentstatusCurrent = $( "#agentstatus-" + canal['1']).attr('data-agentstatus');
		if(val.agentstatus !== agentstatusCurrent){

			$( "#agentstatus-" + canal['1']).attr('data-agentstatus', val.agentstatus);
			$( "#agentstatus-" + canal['1']).html(val.agentstatus_es);
			
			$( "#rowagent-" + canal['1'] ).removeClass().addClass(val.classrow);
			$( "#rowtime-" + canal['1'] ).removeClass().addClass(val.classrow);
			$( "#rowatendidasagente-" + canal['1'] ).removeClass().addClass(val.classrow);

			//Mover row
			/*var html_cont_agent = $( "#rowagent-" + canal['1'] ).clone().html();
			$( "#rowagent-" + canal['1'] ).hide();
			if(val.agentstatus === 'offline'){
				$( "#cont_agent" ).append('<tr class="'+val.classrow+'" id="rowtime-'+canal[1]+'">' + html_cont_agent + '</tr>');
			}

			if(val.agentstatus === 'online'){
				$( "#cont_agent" ).prepend('<tr class="'+val.classrow+'" id="rowtime-'+canal[1]+'">' + html_cont_agent + '</tr>');
			}*/
		}

		$( "#num_calls-" + canal['1'] ).html(val.num_calls);

		//Tiempos agentes
		var total_convers = val.sec_calls;
		var total_break = val.total_break;
		var total_espera = (val.total_sessions - total_convers) - total_break;
		total_convers = total_convers.toString().toHHMMSS();
		total_break = total_break.toString().toHHMMSS();
		total_espera = total_espera.toString().toHHMMSS();

		
		$("#total_break-" + canal['1']).html(total_break);
		if(val.agentstatus === 'online'){
			$("#total_espera-" + canal['1']).html(total_espera);
		}

		if(val.agentstatus === 'oncall'){
			var total_convers_secs = $("#total_convers-" + canal['1']).data('sec_calls') + 1;
			$("#total_convers-" + canal['1']).data('sec_calls' , total_convers_secs);
			total_convers = total_convers_secs.toString().toHHMMSS();
		}

		$("#total_convers-" + canal['1']).html(total_convers);

	});
	return true;
};

$.setLlamadas = function(data){
	var numRows = Object.keys(data).length; //Número de resgistros
	var classRow = "";
	$.each( data, function( i, val ) {
		var canal = '--';
		var agentname = '--';
		var datetime_end = '--';
		var duration = '--';
		if(val.agentchannel !== null){
			var agentchannel = val.agentchannel.split('/');
			canal = agentchannel[1];
		}
		if(val.agentname !== null && val.agentname !== ""){ agentname = val.agentname;}
		if(val.datetime_end !== null && val.datetime_end !== ""){ datetime_end = val.datetime_end;}
		if(val.duration !== null && val.duration !== ""){ 
			duration = val.duration;
			duration = duration.toString().toHHMMSS();
		}

		classRow = setClassRow(val.status);

		Cookies.set('call_entry-'+val.id, val.status);
		$( "#cont_llamadas").prepend('<tr class="'+classRow+'" id="rowcall-'+val.id+'"><td><center id="call_canal-'+val.id+'">'+canal+'</center></td><td><center id="call_agentname-'+val.id+'">'+agentname+'</center></td><td><center>'+val.callerid+'</center></td><td><center>'+val.datetime_entry_queue+'</center></td><td><center id="call_datetime_end-'+val.id+'">'+datetime_end+'</center></td><td><center id="call_duration-'+val.id+'">'+duration+'</center></td><td class="callstatus" id="call_entry-'+val.id+'" data-call_entry_id="'+val.id+'" data-callstatus="'+val.status+'">'+val.status+'</td></tr>');
		//Eliminar fila de la tabla de llamadas
		var num_cont_llamadas = $("#cont_llamadas > tr").length;
		if(num_cont_llamadas > maxLlamadas){
			$("#cont_llamadas tr:last-child").remove();
		}
	});
	return true;
};

$.setNuevasLlamadas = function(data){
	var numRows = Object.keys(data).length; //Número de resgistros
	var classRow = "";
	if(numRows > 0){
		$.each( data, function( i, val ) {
			var canal = '--';
			var agentname = '--';
			var datetime_end = '--';
			var duration = '--';
			if(val.agentchannel !== null){
				var agentchannel = val.agentchannel.split('/');
				canal = agentchannel[1];
			}
			if(val.agentname !== null && val.agentname !== ""){ agentname = val.agentname;}
			if(val.datetime_end !== null && val.datetime_end !== ""){ datetime_end = val.datetime_end;}
			if(val.duration !== null && val.duration !== ""){ 
				duration = val.duration;
				duration = duration.toString().toHHMMSS();
			}

			classRow = setClassRow(val.status);

			Cookies.set('call_entry-'+val.id, val.status);
			$( "#cont_llamadas").prepend('<tr class="'+classRow+'" id="rowcall-'+val.id+'"><td><center id="call_canal-'+val.id+'">'+canal+'</center></td><td><center id="call_agentname-'+val.id+'">'+agentname+'</center></td><td><center>'+val.callerid+'</center></td><td><center>'+val.datetime_entry_queue+'</center></td><td><center id="call_datetime_end-'+val.id+'">'+datetime_end+'</center></td><td><center id="call_duration-'+val.id+'">'+duration+'</center></td><td class="callstatus" id="call_entry-'+val.id+'" data-call_entry_id="'+val.id+'" data-callstatus="'+val.status+'">'+val.status+'</td></tr>');

			//Eliminar fila de la tabla de llamadas
			var num_cont_llamadas = $("#cont_llamadas > tr").length;
			/*console.log(num_cont_llamadas + " MAX: " + maxLlamadas);*/
			if(num_cont_llamadas > maxLlamadas){
				$("#cont_llamadas tr:last-child").remove();
			}
		});
	}
	return true;
};

$.upEstadoLLamadas = function(){
	var dataCalls = [];
	$( ".callstatus" ).each(function( index ) {
		var callstatus = $(this).data('callstatus');
		var call_entry_id = $(this).data('call_entry_id');
		if(callstatus === 'en-cola' || callstatus === 'activa'){
			dataCalls.push(call_entry_id);
		}
	});

	var numRows = Object.keys(dataCalls).length; //Número de resgistros

	if(numRows > 0){
		$.ajax({
			method: 'POST',
			url: base_url + 'phpjson/listarLlamadas.php',
			dataType: 'json',
			data: {queue : queueSelect, tipo : 'RELOAD', calls : dataCalls},
			success: function(data) {
				$.each( data, function( i, val ) {
					var classRow = "";
					var canal = '--';
					var agentname = '--';
					var datetime_end = '--';
					var duration = '--';
					if(val.agentchannel !== null){
						var agentchannel = val.agentchannel.split('/');
						canal = agentchannel[1];
					}

					if(val.agentname !== null && val.agentname !== ""){ agentname = val.agentname;}
					if(val.datetime_end !== null && val.datetime_end !== ""){ datetime_end = val.datetime_end;}
					if(val.duration !== null && val.duration !== ""){ 
						duration = val.duration;
						duration = duration.toString().toHHMMSS();
					}

					var first_callstatus = $('#call_entry-' + val.id).data('callstatus');
					if(val.status != first_callstatus){
						classRow = setClassRow(val.status);

						$('#call_canal-' + val.id).html(canal);
						$('#call_agentname-' + val.id).html(agentname);
						
						$('#call_datetime_end-' + val.id).html(datetime_end);
						$('#call_duration-' + val.id).html(duration);

						$('#call_entry-' + val.id).data("callstatus",val.status).html(val.status);

						/*if(val.status !== 'en-cola' && val.status !== 'activa'){
							$( "#rowcall-" + val.id ).removeClass( "info" );
						}*/

						$( "#rowcall-" + val.id ).removeClass().addClass(classRow);

					}
				});
			}
		});
	}
	return true;
};

$.setLlamadasTotales = function(data){
	var duracion_entrantes = data.duracion_entrantes;
	duracion_entrantes = duracion_entrantes.toString().toHHMMSS();

	var duracion_atendidas = data.duracion_atendidas;
	duracion_atendidas = duracion_atendidas.toString().toHHMMSS();

	var duracion_abandonadas = data.duracion_abandonadas;
	duracion_abandonadas = duracion_abandonadas.toString().toHHMMSS();

	$( "#total_entrantes").html(data.total_entrantes + ' <span>('+ duracion_entrantes + ')</span>');
	$( "#total_atendidas").html(data.total_atendidas + ' <span>('+ duracion_atendidas + ')</span>');
	$( "#total_abandonadas").html(data.total_abandonadas + ' <span>('+ duracion_abandonadas + ')</span>');

	$( "#total_encola").html(data.total_encola);


	var total_conversando = $("#cont_agent .info").length;
	var total_disponibles = $("#cont_agent .success").length;
	var total_enbreak = $("#cont_agent .warning").length;

	$( "#total_conversando").html(total_conversando);
	$( "#total_disponibles").html(total_disponibles);
	$( "#total_enbreak").html(total_enbreak);


	return true;
};

$.getDataJson = function(url, data, callback) {
	return $.ajax({
		method: 'POST',
		url: url,
		data: data,
		dataType: 'json',
		success: callback
	});
};

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
};

function setClassRow(string){
	var className = "active";
	switch(string) {
		case "terminada":
		className = "active";
		break;
		case "abandonada":
		className = "danger";
		break;
		case "en-cola":
		className = "queue_row";
		break;
		case "activa":
		className = "info";
		break;
		default:
		className = "active";
	}
	return className;
}

