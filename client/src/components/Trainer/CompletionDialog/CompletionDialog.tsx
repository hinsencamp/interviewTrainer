import React from "react";
import { useHistory } from "react-router-dom";

import { Dialog, Button, Intent } from "@blueprintjs/core";

import routes from "utils/routes";
import { COMPLETED, FAILED } from "../resultConst";

import style from "./CompletionDialog.module.scss";

interface ICompletionDialog {
  isOpen: boolean;
  handleClose: any;
  finalResults: { [COMPLETED]: string[]; [FAILED]: string[] };
}

export default function CompletionDialog({
  isOpen,
  handleClose,
  finalResults
}: ICompletionDialog) {
  let history = useHistory();

  function handleRedirect(route: string) {
    history.push(route);
  }

  return (
    <Dialog
      title="Training Complete!"
      className={style.dialog}
      onClose={handleClose}
      isOpen={isOpen}
    >
      <div className={style.dialogBody}>
        <span>Learned: {finalResults.COMPLETED.length}</span>
        <span>to Repeat: {finalResults.FAILED.length}</span>
      </div>
      <div className={style.dialogFooter}>
        <Button onClick={() => handleRedirect(routes.trainings)}>
          New Training session
        </Button>
        <Button
          intent={Intent.SUCCESS}
          onClick={() => handleRedirect(routes.dashboard)}
        >
          to Dashboard
        </Button>
      </div>
    </Dialog>
  );
}
