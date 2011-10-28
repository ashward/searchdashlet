<#import "widgets/search-dashlet-input-panel.lib.ftl" as searchDashletInputPanel />
<#import "widgets/search-dashlet-results.lib.ftl" as searchDashletResults />

<div class="dashlet search-dashlet">
	<div class="title">${msg("header")}</div>
<#--	<div class="feed"><a id="${args.htmlid}-feedLink" href="#" target="_blank">&nbsp;</a></div> -->
	<div id="${args.htmlid}-searchDashlet" class="body" <#if args.height??>style="height: ${args.height}px;"</#if>>
		<@searchDashletInputPanel.renderHtml htmlId = args.htmlid + "-inputPanel" />
		<@searchDashletResults.renderHtml htmlId = args.htmlid + "-results" />
	</div>
</div>

<script type="text/javascript">
	//<![CDATA[
	new Alfresco.SearchDashlet("${args.htmlid?js_string}");
	//]]>
   new Alfresco.widget.DashletResizer("${args.htmlid}", "${instance.object.id}");
</script>