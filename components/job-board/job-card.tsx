import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function JobCard() {
  return (
    <Card className='cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors'>
      <CardHeader>
        <CardTitle>JobTitle</CardTitle>
      </CardHeader>
      <CardContent>
        <p>JobCompany</p>
      </CardContent>
    </Card>
  );
}
