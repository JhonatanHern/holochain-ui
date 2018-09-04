import * as React from 'react'
import { Arc } from 'react-konva';
import * as Konva from 'konva';
import { Arc as ArcType } from '../../types/arc'

type AppState = {
    color: string;
}

interface PresenceArcProps {
  classes: any,
  arc: ArcType,
  index: number,
  width: number,
  height: number
}

export class PresenceArc extends React.Component<PresenceArcProps, AppState> {
  constructor(props : PresenceArcProps) {
      super(props);

      this.state = {
          color: 'green'
      };

      setTimeout(() => {
          this.setState({ color: Konva.Util.getRandomColor() });
      }, 1000);
  }

  public render() {
    const { arc, index, width, height } = this.props;
    return (
      <Arc
        x={width / 2}
        y={height / 2}
        innerRadius = {50 * index}
        outerRadius = {50 * index + 20}
        rotation = {arc.begin}
        angle = {arc.duration}
        fill = 'green'
        stroke = 'black'
        strokeWidth = {0}
      />
    );
  }
}
