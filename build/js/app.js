$(function() {
	$('[data-toggle="tooltip"]').tooltip();

	/**
	 * Cargar Agentes
	 */
	var urlListar = base_url +  'phpjson/listarAgentes.php';
	var dataListar = { queue : queueSelect};
	$.getDataJson(urlListar,dataListar, $.setAgentes);

	/**
	 * Actualizar estados de agentes
	 */
	setInterval( function() { $.getDataJson(urlListar,dataListar, $.setEstadosAgentes); }, 1000 );

	/**
	 * Cargar llamadas
	 */
	/*var urlLlamadas = base_url +  'phpjson/listarLlamadas.php';
	var dataLlamadas = { queue : queueSelect, tipo : 'LIST'};
	$.getDataJson(urlLlamadas,dataLlamadas, $.setLlamadas);*/

	/**
	 * Recargar llamadas
	 */
	/*dataLlamadas = { queue : queueSelect, tipo : 'RELIST'};
	setInterval( function() { $.getDataJson(urlLlamadas,dataLlamadas, $.setNuevasLlamadas); }, 1000 );*/

	/**
	 * Actualizar estados de llamadas (en-cola, activa)
	 */
	/*setInterval($.upEstadoLLamadas, 1000);*/

	/**
	 * Cargar llamadas totales
	 */
	var urlLlamadasTotales = base_url +  'phpjson/listarLlamadasTotales.php';
	var dataLlamadasTotales = { queue : queueSelect };
	setInterval( function() { $.getDataJson(urlLlamadasTotales,dataLlamadasTotales, $.setLlamadasTotales); }, 1000 );

	/*sortTable();*/

});