import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function DialogDefault({ handler, children, body, className }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleLogic = () => {
    handler();
    handleOpen();
  };
  return (
    <>
      <Button
        title={body}
        onClick={handleOpen}
        variant="gradient"
        className={`rounded-full concert-one-regular text-white bg-black p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg md:text-2xl ${className}`}
      >
        {children || "Open Dialog"}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="concert-one-regular">
          Warning before performing action.
        </DialogHeader>
        <DialogBody className="concert-one-regular">
          Are you sure you want to perform the following action:{" "}
          <span className="font-bold">{body}</span>?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span className="concert-one-regular">Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleLogic}>
            <span className="concert-one-regular">Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DialogDefault;
