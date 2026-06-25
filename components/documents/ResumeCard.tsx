import { ResumeItem } from '@/actions/resume';
import {
  Card,
  CardHeader,
  CardDescription,
  CardAction,
  CardContent,
  CardTitle,
} from '../ui/card';

export default function ResumeCard({ resume }: { resume: ResumeItem }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{resume.title}</CardTitle>
          <CardDescription>{resume.fileName}</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
}
