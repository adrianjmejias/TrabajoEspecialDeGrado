import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useRouter } from "next/router";

export interface RequestArticleProps {
  closeModal(): void;
}

export const RequestArticleModal: React.FC<
  RequestArticleProps & DialogProps
> = (props) => {
  const history = useRouter()
  
  const [wikiid, setWikiid] = React.useState("");



  return (
    <Dialog {...props}>
      <DialogTitle>Article Extraction Request</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can start an analysis now by inputting the name or the url of a
          Wikipedia article. We will let you know when the graph is ready for
          you.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="wikiid"
          label="Title or URL of article"
          type="text"
          fullWidth
          variant="standard"
          name="wikiid"
          value={wikiid}
          onChange={(event) => {
            setWikiid(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeModal}>Cancel</Button>
        <Button
          onClick={() => {
            const encoded = encodeURIComponent(wikiid);

            if (wikiid.startsWith("https://")) {
              history.push(`/article?url=${encoded}`);
            } else {
              history.push(`/article?title=${encoded}`);
            }
          }}
        >
          Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestArticleModal;
