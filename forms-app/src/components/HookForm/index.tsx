import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FormValues, submitSchema } from '@/helpers/validator';
import { fileToBase64 } from '@/helpers/fileToBase64';
import { useFormStore } from '@/store/useFormStore';
import { passwordStrengthScore, passwordStrengthLabel } from '@/helpers/passwordStrength';

export default function HookForm({ onClose }: { onClose: VoidFunction }) {
  const addEntry = useFormStore((state) => state.addEntry);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(submitSchema),
    mode: 'onChange'
  });

  const pw = watch('password') || '';
  const score = passwordStrengthScore(pw);

  const onSubmit = async (data: FormValues) => {
    let pic: string | undefined;
    const fileInput = document.querySelector('#hf-file') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        throw new Error('Invalid file');
      }
      if (file.size > 2_000_000) {
        throw new Error('Large file');
      }
      pic = await fileToBase64(file);
    }

    addEntry({
      source: 'hookform',
      name: data.name,
      age: data.age,
      email: data.email,
      gender: data.gender,
      country: data.country,
      acceptTos: data.acceptTos,
      pictureBase64: pic || null,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <label htmlFor="hf-name">Name</label>
        <input id="hf-name" {...register('name')} />
        <div className="error">{errors.name?.message}</div>
      </div>
      <div className="form-row">
        <label htmlFor="hf-age">Age</label>
        <input id="hf-age" type="number" {...register('age')} />
        <div className="error">{errors.age?.message}</div>
      </div>
      <div className="form-row">
        <label htmlFor="hf-email">Email</label>
        <input id="hf-email" {...register('email')} />
        <div className="error">{errors.email?.message}</div>
      </div>
      <div className="form-row">
        <label htmlFor="hf-password">Password</label>
        <input id="hf-password" type="password" {...register('password')} />
        <div className="error">{errors.password?.message}</div>
      </div>
      <div className="form-row">
        <label htmlFor="hf-confirm">Confirm</label>
        <input id="hf-confirm" type="password" {...register('confirmPassword')} />
        <div className="error">{errors.confirmPassword?.message}</div>
      </div>
      <div className="form-row">
        <label>Password strength: {passwordStrengthLabel(score)}</label>
      </div>
      <div className="form-row">
        <label htmlFor="hf-gender">Gender</label>
        <select id="hf-gender" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <div className="error">{errors.gender?.message}</div>
      </div>
      <div className="form-row">
        <label htmlFor="hf-country">Country</label>
        <input id="hf-country" {...register('country')} />
        <div className="error">{errors.country?.message}</div>
      </div>
      <div className="form-row">
        <label>
          <input type="checkbox" {...register('acceptTos')} /> Accept T&C
        </label>
        <div className="error">{errors.acceptTos?.message}</div>
      </div>
      <div className="form-row">
        <label htmlFor="hf-file">Picture (png/jpeg, max 2MB)</label>
        <input id="hf-file" type="file" accept="image/png,image/jpeg" />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={!isValid || isSubmitting}>
          Submit
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
