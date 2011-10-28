<#include "/org/alfresco/components/component.head.inc">

<@link rel="stylesheet" type="text/css" href="${page.url.context}/css/com.surevine.alfresco.searchdashlet/search-dashlet.css" />
<@script type="text/javascript" src="${page.url.context}/scripts/com.surevine.alfresco.searchdashlet/search-dashlet.js"></@script>

<#import "widgets/search-dashlet-input-panel.lib.ftl" as searchDashletInputPanel />
<@searchDashletInputPanel.renderHead />

<#import "widgets/search-dashlet-results.lib.ftl" as searchDashletResults />
<@searchDashletResults.renderHead />
