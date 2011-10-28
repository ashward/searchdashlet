<#include "/org/alfresco/components/component.head.inc">

<#-- Anything to include in the page header - e.g. css and scripts -->
<#macro renderHead>
	<@link rel="stylesheet" type="text/css" href="${page.url.context}/css/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-input-panel.css" />
	<@script type="text/javascript" src="${page.url.context}/scripts/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-input-panel.js"></@script>

	<#import "search-dashlet-input.lib.ftl" as searchDashletInput />
	<@searchDashletInput.renderHead />

	<#import "search-dashlet-order-by-input.lib.ftl" as searchDashletOrderByInput />
	<@searchDashletOrderByInput.renderHead />
</#macro>

<#-- This will be rendered into the page -->
<#macro renderHtml htmlId>
	<#import "search-dashlet-input.lib.ftl" as searchDashletInput />
	<#import "search-dashlet-order-by-input.lib.ftl" as searchDashletOrderByInput />

	<div id="${htmlId?html}">
		<form id="${htmlId?html}-form">
			<div class="toolbar flat-button">
				<@searchDashletInput.renderHtml htmlId = htmlId + "-input" />
				<div class="search-button-container align-right"><button id="${htmlId?html}-searchButton">${msg("search")}</button></div>
			</div>
			<div class="toolbar flat-button">
				<@searchDashletOrderByInput.renderHtml htmlId = htmlId + "-orderby" />
			</div>
		</form>
	</div>
	
	<script type="text/javascript">
		//<![CDATA[
		new Alfresco.SearchDashletInputPanel("${htmlId?js_string}");
		//]]>
	</script>
</#macro>