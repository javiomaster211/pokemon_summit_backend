import mongoose, { Schema } from 'mongoose';
import IOrganization from '../types/Organization';

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId }],
    presstige: { type: Number, default: 0 },
    stats: { type: Object, default: {} },
    img: { type: String, default: '' },
    description: { type: String, default: 'No description provided' },
    banner: { type: String, default: '' },
  },
  { timestamps: true }
);

const Organization = mongoose.model('Organization', OrganizationSchema);

export default Organization;
