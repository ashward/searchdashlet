<#include "../../../component.head.inc">

<#-- Anything to include in the page header - e.g. css and scripts -->
<#macro renderHeadBoilerplate>
	<@link rel="stylesheet" type="text/css" href="${page.url.context}/path/to/boilerplate.css" />
	<@script type="text/javascript" src="${page.url.context}/path/to/boilerplate.js"></@script>
</#macro>

<#-- This will be rendered into the page -->
<#macro renderBodyBoilerplate htmlId>
	<div id="${htmlId?html}">
		<p>Content Here</p>
	</div>
	
	<script type="text/javascript">
		//<![CDATA[
		new Alfresco.Boilerplate("${htmlId?js_string}")
			.setMessages(${messages});
		//]]>
	</script>
</#macro>