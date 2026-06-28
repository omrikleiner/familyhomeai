'use client';

import FamilyMembersCard from '../../src/components/FamilyMembersCard';
import { useAppState } from '../../src/context/AppStateContext';

export default function FamilyPage() {
  const { state } = useAppState();

  return (
    <div className="page-grid">
      <FamilyMembersCard familyMembers={state.familyMembers} />
    </div>
  );
}
