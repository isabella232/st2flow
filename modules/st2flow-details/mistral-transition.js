//@flow

import type { TaskRefInterface, TransitionRefInterface } from '@stackstorm/st2flow-model/interfaces';

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import { StringField, SelectField, ColorStringField } from '@stackstorm/module-auto-form/fields';

import style from './style.css';

type TransitionProps = {
  transition: {
    from: TaskRefInterface,
    to: Array<TaskRefInterface>,
    condition?: string,
    color?: string
  },
  taskNames: Array<string> | string,
  selected: boolean,
  onChange?: Function,
};

@connect(
  null,
  (dispatch) => ({
    onChange: (transition: TransitionRefInterface, value: any) => {
      if(value.hasOwnProperty('color')) {
        dispatch({
          type: 'MODEL_ISSUE_COMMAND',
          command: 'setTransitionProperty',
          args: [
            transition,
            'color',
            value.color,
          ],
        });
      }
      else {
        dispatch({
          type: 'MODEL_ISSUE_COMMAND',
          command: 'updateTransition',
          args: [
            transition,
            value,
          ],
        });
      }
    },
  })
)
export default class MistralTransition extends Component<TransitionProps, {}> {
  static propTypes = {
    transition: PropTypes.object.isRequired,
    taskNames: PropTypes.arrayOf(PropTypes.string),
    selected: PropTypes.bool,
    onChange: PropTypes.func,
  }

  style = style
  cache = {} // used to cache togglable data

  handleConditionChange(condition: string) {
    const { transition, onChange } = this.props;
    const { from, to } = transition;

    onChange && onChange(transition, { condition, from, to });
  }

  handleColorChange(color: string) {
    const { transition, onChange } = this.props;

    onChange && onChange(transition, { color });
  }

  handleDoChange(to: string) {
    const { transition, onChange } = this.props;
    const { condition, from } = transition;

    onChange && onChange(transition, { condition, from, to: [{ name: to }] });
  }

  render() {
    const { transition, taskNames, selected } = this.props;
    const [ to ] = transition.to.map(t => t.name);
    const taskOptions = taskNames.map(n => ({ text: n, value: n }));
    const colorOptions = [ '#fecb2f', '#d1583b', '#aa5dd1', '#629e47', '#fd9d32', '#d14c83', '#5b5dd0', '#1072c6' ];

    return (
      <div className={cx(this.style.transition, { [this.style.transitionSelected]: selected })}>
        <div className={this.style.transitionLine} >
          <div className={this.style.transitionLabel}>
            When
          </div>
          <div className={this.style.transitionField}>
            <StringField value={transition.condition} onChange={v => this.handleConditionChange(v)} />
          </div>
          <div className={this.style.transitionButton} />
        </div>
        <div className={this.style.transitionLine} >
          <div className={this.style.transitionLabel}>
            Do
          </div>
          <div className={this.style.transitionField}>
            <SelectField value={to} spec={{ default: true, options: taskOptions }} onChange={v => this.handleDoChange(v)} />
          </div>
        </div>
        <div className={this.style.transitionLine} >
          <div className={this.style.transitionLabel}>
            Color
          </div>
          <div className={this.style.transitionField}>
            <ColorStringField
              options={colorOptions}
              value={transition.color}
              onChange={v => this.handleColorChange(v || '')}
            />
          </div>
        </div>
      </div>
    );
  }
}
