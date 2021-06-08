export default function Modal(props) {
  const classNames = [
    'modal',
    props.show && 'is-active',
  ].filter(e => e).join(' ');

  return (
    <div className={classNames}>
      <div className="modal-background"></div>
      <div className="w-max-25rem w-max-content modal-content">
        <div className="p-0 section">
          <div className="px-5 pt-2 pb-5 box is-flex is-flex-direction-column
                          is-justify-content-center is-align-items-center
                          has-text-centered">

            <div className="my-3 is-size-4">
              {props.title}
            </div>

            <div className="is-size-6 has-text-centered">
              {props.text}
            </div>

            <div className="mt-4 is-flex is-justify-content-space-between">
              <button onClick={props.handleConfirm}
                 className="button is-block is-info is-medium">
                Confirm
              </button>
              <button
                onClick={props.emitCancel}
                className="ml-4 button is-block is-light is-medium">
                  Cancel
              </button>
            </div>

          </div>
        </div>
        <button onClick={props.handleCancel}
                className="modal-close is-large"
                aria-label="close"></button>
      </div>
    </div>
  );
}

export function CityRemoveModal(props) {
  return (
    <Modal show={props.show}
           title={`Remove city '${props.name}'?`}
           text={`Do you want to remove '${props.name}' from the list?`}
           handleConfirm={props.handleConfirm}
           handleCancel={props.handleCancel} />
  )
}
