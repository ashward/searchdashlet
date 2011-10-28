<#include "/org/alfresco/components/component.head.inc">

<#-- Anything to include in the page header - e.g. css and scripts -->
<#macro renderHead>
	<@link rel="stylesheet" type="text/css" href="${page.url.context}/css/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-order-by-input.css" />
	<@script type="text/javascript" src="${page.url.context}/scripts/com.surevine.alfresco.searchdashlet/widgets/search-dashlet-order-by-input.js"></@script>
</#macro>

<#-- This will be rendered into the page -->
<#macro renderHtml htmlId>
	<div id="${htmlId?html}" class="search-dashlet-order-by">
		<div class="align-left">
			<div class="align-left"><label for="${htmlId?html}-orderby">${msg("orderby")}</label></div>
			<div id="${htmlId?html}-orderby" class="align-left">
				<input type="radio" name="orderby" value="" title="${msg("orderby.relevance")}" id="${htmlId?html}-relevanceRadio" checked="checked" />
				<input type="radio" name="orderby" value="cm:title" title="${msg("orderby.title")}" id="${htmlId}-titleRadio" />
			</div>
		</div>
	</div>
	
	<script type="text/javascript">
		//<![CDATA[
		new Alfresco.SearchDashletOrderByInput("${htmlId?js_string}");
		//]]>
	</script>
</#macro>