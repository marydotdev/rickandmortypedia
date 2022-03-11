import useSound from 'use-sound';
import { VolumeUpIcon } from '@heroicons/react/solid'

export default function VolumeButton() {
  const [play] = useSound('/sounds/RickandMortyTheme.mp3');

  return <button onClick={play}>
      <VolumeUpIcon className="h-6 w-6 text-white" />
      </button>;
};