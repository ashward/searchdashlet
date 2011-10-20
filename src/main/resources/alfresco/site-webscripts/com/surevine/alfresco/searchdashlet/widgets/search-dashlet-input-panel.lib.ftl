<#include "/org/alfresco/components/component.head.inc">

<#-- Anything to include in the page header - e.g. css and scripts -->
<#macro renderHead>
	<@link rel="stylesheet" type="text/css" href="${page.url.context}/css/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-input-panel.css" />
	<@script type="text/javascript" src="${page.url.context}/scripts/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-input-panel.js"></@script>

	<#import "search-dashlet-input.lib.ftl" as searchDashletInput />
	<@searchDashletInput.renderHead />
</#macro>

<#-- This will be rendered into the page -->
<#macro renderBody htmlId>
	<#import "search-dashlet-input.lib.ftl" as searchDashletInput />

	<div id="${htmlId?html}">
		<@searchDashletInput.renderBody htmlId = htmlId + "-input" />
	</div>
	
	<script type="text/javascript">
		//<![CDATA[
		new Alfresco.SearchDashletInput("${htmlId?js_string}");
		//]]>
	</script>
</#macro>