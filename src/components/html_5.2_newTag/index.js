import React, {Component} from 'react';
import './index.scss';

class Html_newTag extends Component {

  constructor(){
    super();
  }

  state = {
    dialogWhich: true
  }

  _swhich = (params) => {
    //this.setState({dialogWhich: params});
    if(params)this._dialog.showModal();
    else this._dialog.close();
  }

  render(){
    const {dialogWhich} = this.state;
    return (
      <div className="text_html_newTag">
        <dialog
          className="dialog"
          ref={dialog => this._dialog = dialog}>
          <h2>标题</h2>
          <p>dialog内容</p>
          <menu>
            <button
              onClick={() => this._swhich(false)}
              id="cancel" type="reset">Cancel</button>
            <button type="submit">Confirm</button>
          </menu>
        </dialog>
        <button
          onClick={() => this._swhich(false)}
          className="click_handle">dialog_close</button>
        <button
          onClick={() => this._swhich(true)}
          className="click_handle">dialog_open</button>
      </div>
    );
  }
}

export default Html_newTag;