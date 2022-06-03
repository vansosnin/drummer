import React from "react";
import cx from "classnames";
import styles from "./SequencerNote.module.css";
import { SequencerNote as SequencerNoteEnum } from "../types";

interface ISequencerNoteProps {
  note: SequencerNoteEnum;
  isActive: boolean;
  hasAccent: boolean;
  onChange: (value: SequencerNoteEnum) => void;
}

export const SequencerNote = ({
  note,
  isActive,
  hasAccent,
  onChange,
}: ISequencerNoteProps) => {
  const onClick = () => {
    onChange(
      note === SequencerNoteEnum.On
        ? SequencerNoteEnum.Off
        : SequencerNoteEnum.On
    );
  };

  return (
    <button
      type={"button"}
      onClick={onClick}
      className={cx(styles.container, {
        [styles.isOn]: note === SequencerNoteEnum.On,
        [styles.isActive]: isActive,
        [styles.hasAccent]: hasAccent,
      })}
    />
  );
};
