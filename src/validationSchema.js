import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Tytuł jest wymagany'),
  date: Yup.string().required('Data i czas są wymagane'),
  description: Yup.string().required('Opis jest wymagany'),
  image: Yup.string().url('Nieprawidłowy format URL. Format: https://www.example.com'),
  eventType: Yup.string(),
  phoneNumber: Yup.string(),
  email: Yup.string().email('Nieprawidłowy format adresu email'),
  location: Yup.string()
});

export default validationSchema;