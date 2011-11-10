<#include "/org/alfresco/components/component.head.inc">

<#-- Anything to include in the page header - e.g. css and scripts -->
<#macro renderHead>
	<@link rel="stylesheet" type="text/css" href="${page.url.context}/css/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-results.css" />
	<@script type="text/javascript" src="${page.url.context}/scripts/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-results.js"></@script>
</#macro>

<#-- This will be rendered into the page -->
<#macro renderHtml htmlId>
	<div id="${htmlId?html}" class="search-dashlet-results">
		<div id="${htmlId?html}-results">
		</div>
	</div>
	
	<script type="text/javascript">
		//<![CDATA[
		new Surevine.SearchDashletResults("${htmlId?js_string}");
		//]]>
	</script>
</#macro>