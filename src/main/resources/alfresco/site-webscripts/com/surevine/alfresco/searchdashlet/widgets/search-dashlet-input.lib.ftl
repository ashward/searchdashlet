<#include "/org/alfresco/components/component.head.inc">

<#-- Anything to include in the page header - e.g. css and scripts -->
<#macro renderHead>
	<@link rel="stylesheet" type="text/css" href="${page.url.context}/css/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-input.css" />
	<@script type="text/javascript" src="${page.url.context}/scripts/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-input.js"></@script>
</#macro>

<#-- This will be rendered into the page -->
<#macro renderHtml htmlId>
	<div id="${htmlId?html}" class="search-dashlet-input">
		<div class="term-input-container align-left">${msg("search-for")}: <input type="text" id="${htmlId?html}-searchTerm" name="searchTerm" /></div>
	</div>
	
	<script type="text/javascript">
		//<![CDATA[
		new Alfresco.SearchDashletInput("${htmlId?js_string}");
		//]]>
	</script>
</#macro>