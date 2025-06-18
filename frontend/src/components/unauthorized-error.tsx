import { Link } from '@tanstack/react-router';
import { Button } from './ui/button';
import { Undo2 } from 'lucide-react';

export default function UnauthorizedError() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <h1>You are not unauthorized.</h1>
        <Button asChild variant={'default'}>
          <Link to="/dashboard">
            <Undo2 />
            Back to dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
