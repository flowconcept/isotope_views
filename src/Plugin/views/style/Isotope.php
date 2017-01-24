<?php

/**
 * @file
 * Definition of Drupal\isotope_views\Plugin\views\style\Isotope.
 */

namespace Drupal\isotope_views\Plugin\views\style;

use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\style\StylePluginBase;

/**
 * Style plugin to render isotope responsive grid.
 *
 * @ingroup views_style_plugins
 *
 * @ViewsStyle(
 *   id = "isotope",
 *   title = @Translation("Isotope"),
 *   help = @Translation("Displays rows as isotope responsive grid."),
 *   theme = "views_view_isotope",
 *   display_types = {"normal"}
 * )
 */
class Isotope extends StylePluginBase {

  /**
   * Denotes whether the plugin has an additional options form.
   *
   * @var bool
   */
  protected $usesOptions = TRUE;

  /**
   * Does the style plugin allows to use style plugins.
   *
   * @var bool
   */
  protected $usesRowPlugin = TRUE;

  /**
   * Does the style plugin support custom css class for the rows.
   *
   * @var bool
   */
  protected $usesRowClass = TRUE;

  /**
   * Set default options
   */
  protected function defineOptions() {
    $options = parent::defineOptions();

    $options['row_class'] = ['default' => 'grid-item'];
    $options['wrapper_class'] = [ 'default' => 'isotope-grid'];
    $options['initial_number_of_items'] = [ 'default' => '0'];

    return $options;
  }

  /**
   * Render the given style.
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    parent::buildOptionsForm($form, $form_state);

    $form['row_class']['#default_value'] = $this->options['row_class'];

    $form['wrapper_class'] = [
      '#type' => 'textfield',
      '#title' => t('Wrapper classes'),
      '#default_value' => $this->options['wrapper_class'],
      '#description' => t('Extra classes for the isotope wrapper.'),
    ];

    $form['initial_number_of_items'] = [
      '#type' => 'textfield',
      '#title' => t('Number of items to show initially'),
      '#default_value' => $this->options['initial_number_of_items'],
      '#description' => t('Show this number of items initially, more button adds some. Use 0 for all.'),

    ];

  }
}
