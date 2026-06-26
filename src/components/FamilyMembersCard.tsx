import React from 'react';
import { FamilyMember } from '../types/models';

interface FamilyMembersCardProps {
  familyMembers: FamilyMember[];
}

export default function FamilyMembersCard({ familyMembers }: FamilyMembersCardProps) {
  return (
    <section className="card card-panel family-card">
      <div className="card-header">
        <h2>בני משפחה</h2>
        <span className="badge">{familyMembers.length}</span>
      </div>

      <div className="family-grid">
        {familyMembers.map((member) => (
          <div key={member.id} className="family-item">
            <span className="family-avatar">{member.avatarEmoji}</span>
            <div>
              <strong>{member.name}</strong>
              <p>{member.role === 'parent' ? 'הורה' : member.role === 'child' ? 'ילד/ה' : 'משפחה'}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
