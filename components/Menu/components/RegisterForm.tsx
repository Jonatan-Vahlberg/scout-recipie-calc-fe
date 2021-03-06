import { Form, Formik } from "formik";
import {
  FormButton,
  Label,
  StyledError,
  StyledField,
  TertiaryFormButton,
} from "../../Styled/Form";
import { object, string as yupString } from "yup";
import { AuthFormProps } from "./LoginForm";
import { useUser } from "../../../utils/context/UserContext";
import { useDrawer } from "../../../utils/context/DrawerContext";

const RegisterForm = ({ setMode }: AuthFormProps) => {
  const user = useUser();
  const drawer = useDrawer()
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        first_name: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values) => {
        user.actions.register(
          { ...values, email: values.username },
          () => {
            drawer.actions.setIsOpen(false);
          },
          () => {}
        );
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Label htmlFor="username" className="required">
            Email
          </Label>
          <StyledField
            type="email"
            className="mb-1"
            name="username"
            placeholder="Email"
          />
          <StyledError touched={touched.username}>
            {errors.username}
          </StyledError>
          <Label htmlFor="password" className="required">
            Lösenord
          </Label>
          <StyledField
            className="mb-1"
            name="password"
            type="password"
            placeholder="Lösenord"
          />
          <StyledError touched={touched.password}>
            {errors.password}
          </StyledError>
          <Label htmlFor="first_name" className="required">
            Förnamn
          </Label>
          <StyledField
            className="mb-1"
            name="first_name"
            placeholder="Förnamn"
          />
          <StyledError touched={touched.first_name}>
            {errors.first_name}
          </StyledError>
          <FormButton className="mt-0" type="submit">
            Registrera
          </FormButton>
          <TertiaryFormButton type="button" onClick={() => setMode("LOG")}>
            Eller logga in
          </TertiaryFormButton>
        </Form>
      )}
    </Formik>
  );
};

const registerSchema = object({
  username: yupString()
    .email("Email: Giltig mailadress")
    .required("Fyll i ett värde"),
  password: yupString()
    .min(8, "Lösenord: minst 8 tecken")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "Lösenord: minst en bokstav och siffra "
    )
    .required("Fyll i ett värde"),
    first_name: yupString().required("Fyll i ett värde"),
});

export default RegisterForm;
