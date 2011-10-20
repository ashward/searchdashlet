<#import "widgets/search-dashlet-input-panel.lib.ftl" as searchDashletInputPanel />

<div class="dashlet search-dashlet">
	<div class="title">${msg("header")}</div>
<#--	<div class="feed"><a id="${args.htmlid}-feedLink" href="#" target="_blank">&nbsp;</a></div> -->
	<div id="${args.htmlid}-searchDashlet" class="body" <#if args.height??>style="height: ${args.height}px;"</#if>>
		<@searchDashletInputPanel.renderBody htmlId = args.htmlid + "-searchDashlet-inputPanel" />
	</div>
</div>