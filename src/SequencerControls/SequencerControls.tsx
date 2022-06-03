import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import React from "react";
import { Rhythm, TimeSignature } from "../Sequencer/types";
import styles from "./SequencerControls.module.css";
import { MAX_TEMPO, MIN_TEMPO } from "../constants/metronomeSettings";
import { TempoSlider } from "./TempoSlider";

export enum PlayState {
  Play = "play",
  Stop = "stop",
}

interface ISequencerControlsProps {
  playState: PlayState;
  start: () => void;
  stop: () => void;

  tempo: number;
  onChangeTempo: (tempo: number) => void;

  rhythm: Rhythm;
  onChangeRhythm: (rhythm: Rhythm) => void;

  timeSignature: TimeSignature;
  onChangeTimeSignature: (timeSignature: TimeSignature) => void;
}

export const SequencerControls = ({
  playState,
  start,
  stop,
  tempo,
  onChangeTempo,
  rhythm,
  onChangeRhythm,
  timeSignature,
  onChangeTimeSignature,
}: ISequencerControlsProps) => {
  const handlePlay = () => {
    if (playState === PlayState.Play) {
      stop();
    }

    if (playState === PlayState.Stop) {
      start();
    }
  };

  const handleChangeTempo = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);
    if (value < MIN_TEMPO) {
      value = MIN_TEMPO;
    }
    if (value > MAX_TEMPO) {
      value = MAX_TEMPO;
    }

    onChangeTempo(value);
  };

  const handleChangeRhythm = (event: SelectChangeEvent) => {
    onChangeRhythm(event.target.value as Rhythm);
  };

  const handleChangeTimeSignature = (event: SelectChangeEvent) => {
    onChangeTimeSignature(event.target.value as TimeSignature);
  };

  return (
    <div>
      <div className={styles.slider}>
        <TempoSlider tempo={tempo} onChangeTempo={onChangeTempo} />
      </div>
      <Stack direction="row" spacing={2}>
        <IconButton
          onClick={handlePlay}
          color={playState === PlayState.Play ? "secondary" : "primary"}
        >
          {playState === PlayState.Play ? (
            <StopCircleOutlinedIcon />
          ) : (
            <PlayCircleOutlineIcon />
          )}
        </IconButton>
        <div className={styles.tempoInput}>
          <FormControl fullWidth>
            <TextField
              type="number"
              label="Tempo"
              size="small"
              variant="outlined"
              value={tempo}
              onChange={handleChangeTempo}
            />
          </FormControl>
        </div>
        <div className={styles.selectInput}>
          <FormControl fullWidth size="small">
            <InputLabel>Rhythm</InputLabel>
            <Select label="Rhythm" value={rhythm} onChange={handleChangeRhythm}>
              {Object.values(Rhythm).map((x) => (
                <MenuItem key={x} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={styles.selectInput}>
          <FormControl fullWidth size="small">
            <InputLabel>TimeSignature</InputLabel>
            <Select
              label="TimeSignature"
              value={timeSignature}
              onChange={handleChangeTimeSignature}
            >
              {Object.values(TimeSignature).map((x) => (
                <MenuItem key={x} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Stack>
    </div>
  );
};
