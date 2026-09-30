import { useId } from "react";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { NewNote } from "../../types/note";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

   const createNoteMutation = useMutation({
      mutationFn: (newNote: NewNote) => createNote(newNote),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        onClose();
      },
    });
  
    const handleCreateNote = (newNote: NewNote) => {
      createNoteMutation.mutate(newNote);
    };
  
   

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Todo" }}
      onSubmit={(values) => {
        handleCreateNote(values);
      }}
      validationSchema={validationSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            id={`${fieldId}-content`}
            name="content"
            as="textarea"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            id={`${fieldId}-tag`}
            name="tag"
            as="select"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
