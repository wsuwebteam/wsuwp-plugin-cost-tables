jQuery(document).ready((function(){!function(t){let e=null,n=!1;function a(t,e){return t?t.map((function(t){return`<option value="${t.slug}" ${t.slug===e?"selected":""}>${t.name}</option>`})).join(""):""}"tablepress_edit"===pagenow&&async function(){const s=t('\n\t\t\t<div id="tablepress_edit-table-taxonomies" class="postbox">\n\t\t\t\t<div class="postbox-header">\n\t\t\t\t<h2 class="hndle ui-sortable-handle">Cost Table Taxonomies</h2>\n\t\t\t\t<div class="handle-actions hide-if-no-js">\n\t\t\t\t\t<button\n\t\t\t\t\ttype="button"\n\t\t\t\t\tclass="handle-order-higher"\n\t\t\t\t\taria-disabled="true"\n\t\t\t\t\taria-describedby="tablepress_edit-table-taxonomies-handle-order-higher-description"\n\t\t\t\t\t>\n\t\t\t\t\t<span class="screen-reader-text">Move up</span>\n\t\t\t\t\t<span class="order-higher-indicator" aria-hidden="true"></span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<span\n\t\t\t\t\tclass="hidden"\n\t\t\t\t\tid="tablepress_edit-table-taxonomies-handle-order-higher-description"\n\t\t\t\t\t>Move Table Taxonomies box up</span\n\t\t\t\t\t>\n\t\t\t\t\t<button\n\t\t\t\t\ttype="button"\n\t\t\t\t\tclass="handle-order-lower"\n\t\t\t\t\taria-disabled="false"\n\t\t\t\t\taria-describedby="tablepress_edit-table-taxonomies-handle-order-lower-description"\n\t\t\t\t\t>\n\t\t\t\t\t<span class="screen-reader-text">Move down</span\n\t\t\t\t\t><span class="order-lower-indicator" aria-hidden="true"></span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<span\n\t\t\t\t\tclass="hidden"\n\t\t\t\t\tid="tablepress_edit-table-taxonomies-handle-order-lower-description"\n\t\t\t\t\t>Move Table Taxonomies box down</span\n\t\t\t\t\t>\n\t\t\t\t\t<button type="button" class="handlediv" aria-expanded="true">\n\t\t\t\t\t<span class="screen-reader-text">Toggle panel: Table Taxonomies</span\n\t\t\t\t\t><span class="toggle-indicator" aria-hidden="true"></span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="inside">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t').insertAfter("#tablepress_edit-table-information"),o=await async function(){const t=await fetch(WSUWP_DATA.siteUrl+"/wp-json/wsu-cost-tables/v1/get-cost-table-settings");if(t.ok)return await t.json();throw new Error("Failed to load cost table settings")}(),l=await async function(t){const e=await fetch(WSUWP_DATA.siteUrl+"/wp-json/wsu-cost-tables/v1/get-table-taxonomies?tableId="+t);if(e.ok)return await e.json()}(tp.table.id);!function(e){const n=t("#tablepress_edit-table-manipulation .tablepress-postbox-table tbody"),a=`\n\t\t\t\t<tr class="top-border">\n\t\t\t\t\t<td colspan="2">\n\t\t\t\t\t\tInsert Placeholder:&nbsp;\n\t\t\t\t\t\t${function(t){return t.map((function(t){return`<button type="button" class="button js-wsu-cost-tables__placeholder-btn" style="margin: 0 3px 5px 0;" data-slug="${t.slug}">${t.slug}</button>`})).join("")}(e)}\n\t\t\t\t\t</td>\n\t\t\t\t</tr>`;n.children().last().addClass("bottom-border"),n.append(a)}(o.placeholders),function(e,n,s){const o=s.find(".inside"),l=`\n\t\t\t<table class="tablepress-postbox-table fixed">\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr class="bottom-border">\n\t\t\t\t\t\t<th class="column-1" scope="row"><label for="table-tax-session">Type:</label></th>\n\t\t\t\t\t\t<td class="column-2">\n\t\t\t\t\t\t\t<select id="table-tax-type">\n\t\t\t\t\t\t\t\t<option value=""></option>\n\t\t\t\t\t\t\t\t${a(e.types,n.type)}\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr class="bottom-border">\n\t\t\t\t\t\t<th class="column-1" scope="row"><label for="table-tax-session">Session:</label></th>\n\t\t\t\t\t\t<td class="column-2">\n\t\t\t\t\t\t\t<select id="table-tax-session">\n\t\t\t\t\t\t\t\t<option value=""></option>\n\t\t\t\t\t\t\t\t${a(e.sessions,n.session)}\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr class="bottom-border top-border">\n\t\t\t\t\t\t<th class="column-1" scope="row"><label for="table-tax-campus">Campus:</label></th>\n\t\t\t\t\t\t<td class="column-2">\n\t\t\t\t\t\t\t<select id="table-tax-campus">\n\t\t\t\t\t\t\t\t<option value=""></option>\n\t\t\t\t\t\t\t\t${a(e.campuses,n.campus)}\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr class="top-border">\n\t\t\t\t\t\t<th class="column-1" scope="row"><label for="table-tax-career-path">Career Path:</label></th>\n\t\t\t\t\t\t<td class="column-2">\n\t\t\t\t\t\t\t<select id="table-tax-career-path">\n\t\t\t\t\t\t\t\t<option value=""></option>\n\t\t\t\t\t\t\t\t${a(e.careerPaths,n.careerPath)}\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t`;t(o).html(l)}(o.taxonomies,l,s),t(".save-changes-button").on("click",(()=>{!async function(){if(!tp.table.id)throw new Error("Table ID must be provided");const e=t("#table-tax-type").val(),n=t("#table-tax-session").val(),a=t("#table-tax-campus").val(),s=t("#table-tax-career-path").val();await fetch(WSUWP_DATA.siteUrl+"/wp-json/wsu-cost-tables/v1/update-table-taxonomies",{method:"POST",body:new URLSearchParams({tableId:tp.table.id,type:e,session:n,campus:a,careerPath:s})})}()})),t(".js-wsu-cost-tables__placeholder-btn").on("click",(t=>{!function(t){n||(alert("Please click into the cell you want to add the placeholder to."),n=!0),e=t.currentTarget.dataset.slug}(t)})),t("#tablepress_edit-table-data").on("click",(function(t){!function(t){e&&"textarea"===t.target.type&&(t.target.value=e,e=null)}(t)}))}()}(jQuery)}));