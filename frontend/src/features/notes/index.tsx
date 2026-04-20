import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

interface NoteData {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export function Notes() {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get('/api/notes/')
      .then((res) => setNotes(res.data))
      .catch((err) => {
        console.error(err);
        toast.error('Failed to fetch notes');
      });
  };

  const deleteNote = (id: number) => {
    api
      .delete(`/api/notes/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          toast.success('Note deleted successfully');
          getNotes();
        } else {
          toast.error('Failed to delete note');
        }
      })
      .catch((err) => console.error(err));
  };

  const createNote = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .post('/api/notes/', { title, content })
      .then((res) => {
        if (res.status === 201) {
          toast.success('Note created successfully');
          setTitle('');
          setContent('');
          getNotes();
        } else {
          toast.error('Failed to create note');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to create note');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Notes</h1>
          <p className='text-muted-foreground'>Manage your personal notes.</p>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Create a Note</CardTitle>
            <CardDescription>Add a new note to your collection.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createNote} className='space-y-4'>
              <div className='space-y-2'>
                <label htmlFor="title" className='text-sm font-medium'>Title</label>
                <Input
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note title"
                />
              </div>
              <div className='space-y-2'>
                <label htmlFor="content" className='text-sm font-medium'>Content</label>
                <Textarea
                  id="content"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note here..."
                  className='min-h-[150px]'
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Note'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className='space-y-4'>
          {notes.length === 0 ? (
            <p className='text-muted-foreground'>No notes found. Create one!</p>
          ) : (
            notes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription>
                    {new Date(note.created_at).toLocaleDateString('en-US')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='whitespace-pre-wrap'>{note.content}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" size="sm" onClick={() => deleteNote(note.id)}>
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
