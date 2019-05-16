from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny, DjangoModelPermissions
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Team, TeamAchievement, Achievement, Balise, Position
from api.serializers import PublicTeamSerializer, TeamSerializer, TeamAchievementSerializer, AchievementSerializer, \
    UserSerializer


class PublicTeamsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Team.objects.all()
    many = True;
    serializer_class = PublicTeamSerializer
    permission_classes = [AllowAny]


class TeamsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [AllowAny]


class TeamAchievementsViewSet(viewsets.ModelViewSet):
    queryset = TeamAchievement.objects.all()
    serializer_class = TeamAchievementSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(created_by_id=self.request.user.id)


class AchievementsViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.all().order_by('name')
    serializer_class = AchievementSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(created_by_id=self.request.user.id)


@permission_classes([])
class CurrentUserViews(APIView):
    def get(self, request):
        if not request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(UserSerializer(request.user).data)


@permission_classes([])
class PositionUpdateViews(APIView):
    def post(self, request):
        try:
            token = request.data['token']
            if token != settings.POSITION_API_KEY:
                return Response(status=403)
            serial = request.data['position']['sid']
            lat = request.data['position']['latitude']
            lng = request.data['position']['longitude']
            name = request.data['position']['name']
            dh = request.data['position']['dh']
            speed = request.data['position']['speed']
            balise = Balise.objects.get(serial=serial)
            position = Position(
                latitude=lat,
                longitude=lng,
                name=name,
                dh=dh,
                speed=speed,
                balise=balise
            )
            position.save()
            return Response(status=200)
        except KeyError:
            return Response(status=400)
        except Balise.DoesNotExist:
            return Response(status=404)


@permission_classes([])
class LogoutViews(APIView):
    def delete(self, request):
        if not request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(request.user.id)

