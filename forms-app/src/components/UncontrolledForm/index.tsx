import {type FormEvent, useRef, useState} from 'react';
import {submitSchema} from '@/helpers/validator';
import {fileToBase64} from '@/helpers/fileToBase64';
import {useFormStore} from '@/store/useFormStore';
import type {ZodIssue} from 'zod';

export default function UncontrolledForm({onClose}: { onClose: VoidFunction }) {
  const nameReference = useRef<HTMLInputElement | null>(null);
  const ageReference = useRef<HTMLInputElement | null>(null);
  const emailReference = useRef<HTMLInputElement | null>(null);
  const passwordReference = useRef<HTMLInputElement | null>(null);
  const confirmReference = useRef<HTMLInputElement | null>(null);
  const genderReference = useRef<HTMLSelectElement | null>(null);
  const countryReference = useRef<HTMLInputElement | null>(null);
  const acceptReference = useRef<HTMLInputElement | null>(null);
  const fileReference = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const addEntry = useFormStore((state) => state.addEntry);

  const clearError = (fieldName: string) => {
    setErrors((previous) => {
      const newErrors = {...previous};
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      name: nameReference.current?.value || '',
      age: ageReference.current?.value || '',
      email: emailReference.current?.value || '',
      password: passwordReference.current?.value || '',
      confirmPassword: confirmReference.current?.value || '',
      gender: genderReference.current?.value || 'other',
      country: countryReference.current?.value || '',
      acceptTos: Boolean(acceptReference.current?.checked),
      file: fileReference.current?.files?.[0],
    };

    const parsed = submitSchema.safeParse(payload);
    if (!parsed.success) {
      const errorMap: Record<string, string> = {};
      parsed.error.issues.forEach((error: ZodIssue) => {
        const path = error.path[0];
        if (typeof path === 'string') {
          errorMap[path] = error.message;
        }
      });
      setErrors(errorMap);

      const firstErrorField = Object.keys(errorMap)[0];
      if (firstErrorField) {
        const element = document.getElementById(`uc-${firstErrorField}`);
        element?.focus();
      }
      return;
    }

    let pic: string | undefined;
    const file = fileReference.current?.files?.[0];
    if (file) {
      console.log(`${file.size} bytes`);
      pic = await fileToBase64(file);
    }

    addEntry({
      source: 'uncontrolled',
      name: parsed.data.name,
      age: Number(parsed.data.age),
      email: parsed.data.email,
      gender: parsed.data.gender,
      country: parsed.data.country,
      acceptTos: parsed.data.acceptTos,
      pictureBase64: pic || null,
    });
    onClose();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <label htmlFor="uc-name">Name</label>
        <input
          id="uc-name"
          ref={nameReference}
          className={errors.name ? 'error' : ''}
          onChange={() => clearError('name')}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="uc-age">Age</label>
        <input
          id="uc-age"
          type="number"
          ref={ageReference}
          className={errors.age ? 'error' : ''}
          onChange={() => clearError('age')}
        />
        {errors.age && <span className="error-text">{errors.age}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="uc-email">Email</label>
        <input
          id="uc-email"
          ref={emailReference}
          className={errors.email ? 'error' : ''}
          onChange={() => clearError('email')}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="uc-password">Password</label>
        <input
          id="uc-password"
          type="password"
          ref={passwordReference}
          className={errors.password ? 'error' : ''}
          onChange={() => clearError('password')}
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="uc-confirm">Confirm</label>
        <input
          id="uc-confirm"
          type="password"
          ref={confirmReference}
          className={errors.confirmPassword ? 'error' : ''}
          onChange={() => clearError('confirmPassword')}
        />
        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="uc-gender">Gender</label>
        <select
          id="uc-gender"
          ref={genderReference}
          className={errors.gender ? 'error' : ''}
          onChange={() => clearError('gender')}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <span className="error-text">{errors.gender}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="uc-country">Country</label>
        <input
          id="uc-country"
          ref={countryReference}
          className={errors.country ? 'error' : ''}
          onChange={() => clearError('country')}
        />
        {errors.country && <span className="error-text">{errors.country}</span>}
      </div>
      <div className="form-row">
        <label className={errors.acceptTos ? 'error' : ''}>
          <input
            id="uc-acceptTos"
            type="checkbox"
            ref={acceptReference}
            onChange={() => clearError('acceptTos')}
          />
          Accept T&C
        </label>
        {errors.acceptTos && <span className="error-text">{errors.acceptTos}</span>}
      </div>
      <div className="form-row">
        <label htmlFor="uc-file">Picture (png/jpeg, max 2MB)</label>
        <input
          id="uc-file"
          ref={fileReference}
          type="file"
          accept="image/png,image/jpeg"
        />
        {errors.file && <span className="error-text">{errors.file}</span>}
      </div>
      <div style={{display: 'flex', gap: 8}}>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
