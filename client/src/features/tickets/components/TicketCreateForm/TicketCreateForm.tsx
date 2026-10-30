import { useNavigate } from 'react-router-dom';
import styles from './TicketForm.module.css';
import { useEffect, useState, type FormEvent } from 'react';
import type { User } from '../../types/ticket.types';
import axios from 'axios';
import type { ApiResponse } from '../../../../shared/types/api.types';

const API_URL = "http://localhost:4000/api";

export function TicketCreateForm() {
  const navigate = useNavigate();

  // 🔴 TODO:
  // 1. set up controlled component state for: title, description, priority, category,
  //    reporterName, reporterEmail, reporterEmail
  // 2. fetch users from GET /api/users on mount (for the assignee dropdown)
  // 3. on submit, POST to /api/tickets with the form data,
  //    then navigate to /tickets/:id using the returned ticket id
  // 4. track a "submitting" state — disable the submit button and show "Saving..." while the request is in flight

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCcategory] = useState("bug");
  const [reporterName, setReporterName] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const [user, setUser] = useState<User[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<ApiResponse<User[]>>(`${API_URL}/users`);

        setUser(response.data.data);
      } catch(err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(submitting) return;

    setSubmitting(true);
    setError(null);

    try{
      const formData = {
        title,
        description,
        priority,
        category,
        reporterName,
        reporterEmail,
        assigneeId: assigneeId ? Number(assigneeId) : null,
      };

      const response = await axios.post<ApiResponse<{id: number}>>(`${API_URL}/tickets`, formData);
      const ticketId = response.data.data.id;

      navigate(`/tickets/${ticketId}`);
    } catch (err: unknown) {
      if(axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to create ticket"
        );
      } else {
        setError("Failed to create ticket");
      }
  } finally{
    setSubmitting(false);
  }

  return (
    <div className={styles.container}>
      <h1>Create Ticket</h1>

      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">Title *</label>
          <input id="title" type="text" />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description *</label>
          <textarea id="description" rows={6} />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="priority">Priority *</label>
            <select id="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="category">Category *</label>
            <select id="category">
              <option value="bug">Bug</option>
              <option value="feature_request">Feature Request</option>
              <option value="question">Question</option>
              <option value="account_issue">Account Issue</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="reporterName">Reporter Name *</label>
            <input id="reporterName" type="text" />
            </div>

          <div className={styles.field}>
            <label htmlFor="reporterEmail">Reporter Email *</label>
            <input id="reporterEmail" type="email" />
            </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="assigneeId">Assignee</label>
          <select id="assigneeId">
            <option value="">Unassigned</option>
            {/* render one <option> per user from the fetched users list */}
          </select>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            Create Ticket
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}}
