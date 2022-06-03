import React, { useState } from "react";

import { MAX_TEMPO, MIN_TEMPO } from "../constants/metronomeSettings";
import { Slider } from "@mui/material";

interface ITempoSliderProps {
  tempo: number;
  onChangeTempo: (tempo: number) => void;
}

export const TempoSlider = ({ tempo, onChangeTempo }: ITempoSliderProps) => {
  const [sliderTempo, setSliderTempo] = useState(tempo);

  const handleChangeSliderTempo = (e: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      return;
    }

    setSliderTempo(value);
  };

  const handleChangeSliderTempoCommitted = (
    e: React.SyntheticEvent | Event,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      return;
    }

    onChangeTempo(value);
  };

  return (
    <Slider
      aria-label="Tempo"
      valueLabelDisplay="auto"
      value={sliderTempo}
      min={MIN_TEMPO}
      max={MAX_TEMPO}
      step={1}
      onChange={handleChangeSliderTempo}
      onChangeCommitted={handleChangeSliderTempoCommitted}
    />
  );
};
