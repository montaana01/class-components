import {useEffect, useState} from 'react';
import {Container} from '@/components/Container';
import '@/assets/styles/global.scss';
import {countries} from '@/constants';
import {useFormStore} from '@/store/useFormStore';
import ModalPortal from '@/components/ModalPortal';
import UncontrolledForm from '@/components/UncontrolledForm';
import HookForm from '@/components/HookForm';

function App() {
  const [open, setOpen] = useState<'none' | 'uc' | 'hf'>('none');
  const entries = useFormStore((store) => store.entries);
  const setCountries = useFormStore((store) => store.setCountries);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => setCountries(countries), [setCountries]);

  useEffect(() => {
    if (entries[0]) {
      setHighlighted(entries[0].id);
      const t = setTimeout(() => setHighlighted(null), 3000);
      return () => clearTimeout(t);
    }
  }, [entries]);

  return (
    <>
      <header className="header">
        <Container>
          <div className="header_wrapper">
            <h1>Forms task = React + Zustand + Zod</h1>
            <button onClick={() => setOpen('uc')}>Open Uncontrolled Form</button>
            <button onClick={() => setOpen('hf')}>Open React Hook Form</button>
          </div>
        </Container>
      </header>
      <main>
        <Container>
          {entries.map((entry) => (
            <div key={entry.id} className={`tile ${highlighted === entry.id ? 'newly' : ''}`}>
              <strong>{entry.name}</strong> <em>({entry.source})</em>
              <div>age: {entry.age}</div>
              <div>email: {entry.email}</div>
              <div>gender: {entry.gender}</div>
              <div>country: {entry.country}</div>
              {entry.pictureBase64 && (
                <img
                  src={entry.pictureBase64}
                  alt="pic"
                  className={'main_image'}
                />
              )}
            </div>
          ))}
          <ModalPortal open={open !== 'none'} onClose={() => setOpen('none')}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <h2 id="modal-title">{open === 'uc' ? 'Uncontrolled' : 'Hook Form'}</h2>
              <button onClick={() => setOpen('none')}>X</button>
            </div>
            {open === 'uc' && <UncontrolledForm onClose={() => setOpen('none')}/>}
            {open === 'hf' && <HookForm onClose={() => setOpen('none')}/>}
          </ModalPortal>
        </Container>
      </main>
      <footer>
        <Container>
          <h3>
            Made by <a href="https://linkedin.com/in/yakovlevdeveloper">Alexey Yakovlev</a>
          </h3>
          <h4>© {new Date().getFullYear()} | Minsk, Belarus</h4>
        </Container>
      </footer>
    </>
  );
}

export default App;
