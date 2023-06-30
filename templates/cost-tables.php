<div class="wsu-cost-tables <?php echo esc_attr( $attrs['className'] ); ?>"
	data-component-id="<?php echo esc_attr( $attrs['instance_id'] ); ?>"
	data-error-message="<?php echo esc_attr( $attrs['error_message'] ); ?>">
	<div class="wsu-cost-tables__filters">
		<?php
		if ( ! empty( $attrs['settings']['taxonomies']['sessions'] ) ) {
			echo '<div class="wsu-cost-tables__filter wsu-cost-tables__filter--session">';
			echo '<label class="wsu-cost-tables__filter-label" class="wsu-cost-tables__filter-label" for="wsu-cost-table-filter-session-' . esc_attr( $attrs['instance_id'] ) . '">Year/Session</label>';
			echo '<select data-property="session" class="wsu-cost-tables__filter-select" id="wsu-cost-table-filter-session-' . esc_attr( $attrs['instance_id'] ) . '">';
			foreach ( $attrs['settings']['taxonomies']['sessions'] as $session ) {
				$selected = $attrs['default_session'] === $session['slug'] ? ' selected="selected"' : '';
				echo '<option value="' . esc_attr( $session['slug'] ) . '"' . $selected . '>' . esc_attr( $session['name'] ) . '</option>';
			}
			echo '</select>';
			echo '</div>';
		}


		if ( ! empty( $attrs['settings']['taxonomies']['campuses'] ) ) {
			echo '<div class="wsu-cost-tables__filter wsu-cost-tables__filter--campus">';
			echo '<label class="wsu-cost-tables__filter-label" for="wsu-cost-table-filter-campus' . esc_attr( $attrs['instance_id'] ) . '">Campus</label>';
			echo '<select data-property="campus" class="wsu-cost-tables__filter-select" id="wsu-cost-table-filter-campus' . esc_attr( $attrs['instance_id'] ) . '">';
			foreach ( $attrs['settings']['taxonomies']['campuses'] as $campus ) {
				$selected = $attrs['default_campus'] === $campus['slug'] ? ' selected="selected"' : '';
				echo '<option value="' . esc_attr( $campus['slug'] ) . '"' . $selected . '>' . esc_attr( $campus['name'] ) . '</option>';
			}
			echo '</select>';
			echo '</div>';
		}

		if ( ! empty( $attrs['settings']['taxonomies']['careerPaths'] ) ) {
			echo '<div class="wsu-cost-tables__filter wsu-cost-tables__filter--career-path">';
			echo '<label class="wsu-cost-tables__filter-label" for="wsu-cost-table-filter-career-path' . esc_attr( $attrs['instance_id'] ) . '">Career Path</label>';
			echo '<select data-property="careerPath" class="wsu-cost-tables__filter-select" id="wsu-cost-table-filter-career-path' . esc_attr( $attrs['instance_id'] ) . '">';
			foreach ( $attrs['settings']['taxonomies']['careerPaths'] as $career_path ) {
				$selected = $attrs['default_career_path'] === $career_path['slug'] ? ' selected="selected"' : '';
				echo '<option value="' . esc_attr( $career_path['slug'] ) . '"' . $selected . '>' . esc_attr( $career_path['name'] ) . '</option>';
			}
			echo '</select>';
			echo '</div>';
		}
		?>
	</div>

	<div class="wsu-cost-tables__loading"></div>

	<div class="wsu-cost-tables__table-container">
		<?php
		if ( ! empty( $attrs['default_table_content'] ) ) {
			echo $attrs['default_table_content'];
		} else {
			echo '<p class="wsu-cost-tables__error">' . esc_attr( $attrs['error_message'] ) . '</p>';
		}
		?>
	</div>
</div>
