<#import "widgets/search-dashlet-input-panel.lib.ftl" as searchDashletInputPanel />
<#import "widgets/search-dashlet-results.lib.ftl" as searchDashletResults />

<div class="dashlet search-dashlet">
	<div class="title">${msg("header")}</div>
	<div id="${args.htmlid}-searchDashlet" class="body" <#if args.height??>style="height: ${args.height}px;"</#if>>
		<@searchDashletInputPanel.renderHtml htmlId = args.htmlid + "-inputPanel" />
		<@searchDashletResults.renderHtml htmlId = args.htmlid + "-results" />
	</div>
</div>

<script type="text/javascript">
	//<![CDATA[
	new Alfresco.SearchDashlet("${args.htmlid?js_string}")
		.setOptions({
			siteId : "${page.url.templateArgs.site!""?js_string}"
		})
		.setMessages(${messages});
	new Alfresco.widget.DashletResizer("${args.htmlid?js_string}", "${instance.object.id?js_string}");
	//]]>
</script>