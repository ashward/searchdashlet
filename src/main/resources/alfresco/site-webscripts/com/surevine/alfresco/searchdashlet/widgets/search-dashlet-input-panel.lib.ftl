<#include "/org/alfresco/components/component.head.inc">

<#-- Anything to include in the page header - e.g. css and scripts -->
<#macro renderHead>
	<@link rel="stylesheet" type="text/css" href="${page.url.context}/css/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-input-panel.css" />
	<@script type="text/javascript" src="${page.url.context}/scripts/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-input-panel.js"></@script>

	<#import "search-dashlet-term-input.lib.ftl" as searchDashletTermInput />
	<@searchDashletTermInput.renderHead />

	<#import "search-dashlet-order-by-input.lib.ftl" as searchDashletOrderByInput />
	<@searchDashletOrderByInput.renderHead />
</#macro>

<#-- This will be rendered into the page -->
<#macro renderHtml htmlId>
	<#import "search-dashlet-term-input.lib.ftl" as searchDashletTermInput />
	<#import "search-dashlet-order-by-input.lib.ftl" as searchDashletOrderByInput />

	<div id="${htmlId?html}">
		<form id="${htmlId?html}-form">
			<div class="toolbar flat-button">
				<@searchDashletTermInput.renderHtml htmlId = htmlId + "-termInput" />
				<div class="search-button-container align-right"><button id="${htmlId?html}-searchButton">${msg("search")}</button></div>
			</div>
			<div class="toolbar flat-button">
				<@searchDashletOrderByInput.renderHtml htmlId = htmlId + "-orderByInput" />
			</div>
		</form>
	</div>
	
	<script type="text/javascript">
		//<![CDATA[
		new Surevine.SearchDashletInputPanel("${htmlId?js_string}");
		//]]>
	</script>
</#macro>