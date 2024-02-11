import ImageRender from "../../Components/Tabels/ImageRender";
import Badge from "../../Components/Badge";
import DateRender from "../../Components/Tabels/DateRender";

import { ROLE_TYPES } from "../../Enum/Role";

export const TABEL_META = [
  {
    title: "Nama",
    key: "name",
  },
  {
    key: "email",
    title: "Email",
  },
  {
    key: "image",
    title: "Photo Profile",
    Cell: (val) => (
      <ImageRender
        className="img-circle elevation-2"
        src={val}
        alt={`Gambar Profile-${val}`}
				style={{
					width: '60px',
					height: '60px',
					objectFit: 'cover',
				}}
      />
    ),
  },
  {
    key: "role",
    title: "Role",
		Cell: (val) => (val === ROLE_TYPES.ADMIN ? (<Badge className="badge bg-primary" label="Admin" />) : (<Badge className="badge bg-warning" label="Sales" />))
  },
  {
    key: "created_at",
    title: "Dibuat Pada",
		Cell: (val) => (<DateRender val={val} />)
  },
  {
    key: "updated_at",
    title: "Diupdate Pada",
		Cell: (val) => (<DateRender val={val} />)
  },
];
